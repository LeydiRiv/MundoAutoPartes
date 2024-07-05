//EL controlador realiza las peticiones al modelo

const controller = {};


//Indicamos la vista de inicio de sesión
controller.index = (req, res) => {

    res.render('login');
}


controller.sesion = (req, res) => {
    const correo = req.body.correo;
    const clave = req.body.clave;
    console.log(correo);
    console.log(clave);
    req.getConnection((err, conn) => {
        // ...

        conn.query('SELECT id FROM usuarios WHERE correo = ? AND clave = ?', [correo, clave], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al realizar la consulta');
                return;
            }

            if (result.length === 0) {
                console.log('Usuario no encontrado');
                res.status(401).send('Correo o clave incorrectos');
            } else {
                console.log('Inicio exitoso');
                req.session.userId = result[0].id; // Almacena el ID del usuario en la sesión



                if (correo == 'admin@gmail.com' && clave == 'admin') {
                    res.render('productos');
                } else {
                    res.render('principal');
                }
            }
        });
    });
};

// Almacenar datos del producto
controller.registroprod = (req, res) => {
    
    const datosP = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into productos set ?', [datosP], (err, datosP) => {
            console.log("Datos agregados");
            res.redirect('productos');
        });
        
    });
};

// Mostrar contenido de la tabla de proveedores
controller.inicioProv = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from proveedores', (err, rowsAuto) => {
            if (err) {
                res.json(err);
            }
            console.log(rowsAuto);
            res.render('proveedores', {
                data: rowsAuto
            });
        });
    });
};

controller.saveP = (req, res) => {
    const datosA = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO proveedores SET ?', [datosA], (err, result) => {
            res.redirect('proveedores');
        });
    });
};



controller.mostrarPerfilUsuario = async (req, res, conn) => {
    try {
        const usuario = await obtenerDatosUsuario(req.session.userId, conn);
        /* agregado linea */
        const datosPersonales = await obtenerDatosPersonales(req.session.userId, conn);
        /* fin, tambien se le agrega datosPersonales delante del usuario */
        res.render('perfilUsuario', { usuario, datosPersonales });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos del usuario');
    }
};


const obtenerDatosPersonales = (userId, conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM datos_personales WHERE usuario_id = ?', userId, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log('Datos personales encontrados:', result); // Verifica los datos recuperados
                resolve(result[0]); // Devuelve el primer resultado (suponiendo que solo hay uno)
            }
        });
    });
};


const obtenerDatosUsuario = (userId, conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM usuarios WHERE id = ?', userId, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]); // Devuelve el primer resultado (suponiendo que solo hay uno)
            }
        });
    });
};



controller.renderizarEditarPerfil = async (req, res, conn) => {
    try {
        const datosPersonales = await obtenerDatosPersonales(req.session.userId, conn);
        const usuario = await obtenerDatosUsuario(req.session.userId, conn);
        res.render('editar_p', { datosPersonales, usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos del usuario para editar');
    }
};




/* Actualizar datos personales del usuario en base a su id */
const updateDatosPersonales = (datosActualizados, userId, conn) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE datos_personales SET ? WHERE usuario_id = ?', [datosActualizados, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// Función para actualizar datos de usuario en la tabla 'usuarios'
const updateDatosUsuario = (datosActualizados, userId, conn) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE usuarios SET ? WHERE id = ?', [datosActualizados, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};




// Controlador para manejar la actualización de los datos
// Controlador para manejar la actualización de los datos
controller.actualizarPerfilUsuario = async (req, res, conn) => {
    try {
        const userId = req.session.userId;
        const datosUsuarioActualizados = {
            clave: req.body.clave,
            // Otros campos de la tabla 'usuarios' que necesitas actualizar
        };

        const datosPersonalesActualizados = {
            nombre: req.body.nombre,
            apellidop: req.body.apellidop,
            apellidom: req.body.apellidom,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            estado: req.body.estado,
            codigoP: req.body.codigoP,
            telefono: req.body.telefono,
            // Otros campos de la tabla 'datos_personales' que necesitas actualizar
        };

        await updateDatosUsuario(datosUsuarioActualizados, userId, conn);
        await updateDatosPersonales(datosPersonalesActualizados, userId, conn);

        console.log('Datos actualizados exitosamente');
        res.redirect('/perfilUsuario.ejs');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar los datos del usuario');
    }
};

// Almacenar datos del usuario
controller.registerU = (req, res) => {
    const usuarioData = {
        correo: req.body.correo,
        clave: req.body.clave
    };

    const datosPersonalesData = {
        nombre: req.body.nombre,
        apellidoP: req.body.apellidoP,
        apellidoM: req.body.apellidoM,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        estado: req.body.estado,
        codigoP: req.body.codigoP,
        telefono: req.body.telefono
    };

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            res.status(500).send('Error de conexión a la base de datos');
            return;
        }

        conn.query('SELECT * FROM usuarios WHERE correo = ?', [usuarioData.correo], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al verificar el correo en la base de datos');
                return;
            }

            if (result.length > 0) {
                // El correo ya existe, manejar la situación aquí
                res.status(400).send('El correo electrónico ya está registrado');
            } else {
                conn.beginTransaction((err) => {
                    if (err) {
                        console.error('Error al iniciar la transacción:', err);
                        res.status(500).send('Error al iniciar la transacción en la base de datos');
                        return;
                    }

                    conn.query('INSERT INTO usuarios SET ?', usuarioData, (err, result) => {
                        if (err) {
                            conn.rollback(() => {
                                console.error('Error al insertar datos en usuarios:', err);
                                res.status(500).send('Error al registrar el usuario en la base de datos');
                            });
                            return;
                        }

                        const usuarioId = result.insertId; // ID insertada en la tabla usuarios

                        datosPersonalesData.usuario_id = usuarioId;

                        conn.query('INSERT INTO datos_personales SET ?', datosPersonalesData, (err, result) => {
                            if (err) {
                                conn.rollback(() => {
                                    console.error('Error al insertar datos en datos_personales:', err);
                                    res.status(500).send('Error al registrar los datos personales en la base de datos');
                                });
                                return;
                            }

                            conn.commit((err) => {
                                if (err) {
                                    conn.rollback(() => {
                                        console.error('Error al realizar commit:', err);
                                        res.status(500).send('Error al realizar el commit en la base de datos');
                                    });
                                    return;
                                }
                                console.log('¡Registro exitoso!');
                                res.redirect('/login.ejs'); // Redirige a la página deseada después del registro exitoso
                            });
                        });
                    });
                });
            }
        });
    });
};

// //colocamos la eliminacion del dato donde colocamos un err y un rows y luego le hacemos la seleccion del id con un err y un row y la coneccion directa con la raiz '/'
controller.deleteA = (req, res) => {
    req.getConnection((err, conn) => {
        var id = 0;
        id = req.params.id;
        console.log('ingreso a borrar');
        console.log(id);
        conn.query('delete from proveedores where id = ?', [id], (err, rowsAuto) => {
            res.redirect('/proveedores');
        });
    });
};

// consulta detallada de un registro
controller.consultA = (req, res) => {
    let id = 0;
    id = req.params.id;
    console.log(id);
    req.getConnection((err, conn) => {
        conn.query('select * from proveedores where id = ?',
            [id], (err, rowsAuto) => {
                res.render('proveedor_edit', {
                    data: rowsAuto[0]
                });
            });
    });
};

//Modificar datos
controller.updateA = (req, res) => {
    const id = req.params.id;
    const nomEmpresa = req.body.nomEmpresa;
    const direccion = req.body.direccion;
    const ciudad = req.body.ciudad;
    const estado = req.body.estado;
    const codigoP = req.body.codigoP;
    const correoElec = req.body.correoElec;
    const telefono = req.body.telefono;

    req.getConnection((err, conn) => {
        // console.log('ingreso a modificar');
        conn.query('UPDATE proveedores SET nomEmpresa = ?, direccion = ?, ciudad = ?, estado = ?, codigoP = ?, correoElec = ?, telefono = ? WHERE id = ?', [nomEmpresa, direccion, ciudad, estado, codigoP, correoElec, telefono, id], (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error al actualizar el proveedor');
            } else {
                console.log('Proveedor actualizado exitosamente');
                res.redirect('/proveedores');
            }
        });
    });
};

// controller.consultP = (req, res) => {
//     let id = 0;
//     id = req.params.id;
//     console.log(id);
//     req.getConnection((err, conn) => {
//         conn.query('select * from productos where id = ?',
//             [id], (err, rowsAuto) => {
//                 res.render('productos', {
//                     productos: rowsAuto[0]
//                 });
//             });
//     });
// };




// //Modificar datos
// controller.updateP = (req, res) => {
//     const id = req.params.id;
//     const nombre = req.body.nombre;
//     const modelo = req.body.modelo;
//     const precio = req.body.precio;
//     const categoria = req.body.categoria;
//     const idProveedor = req.body.idProveedor;
//     const stock = req.body.stock;
//     const descripcion = req.body.descripcion;
//     const imagen = req.body.imagen;

//     req.getConnection((err, conn) => {
//         // console.log('ingreso a modificar');
//         conn.query('UPDATE productos SET nombre = ?, modelo = ?, precio = ?, categoria = ?, idProveedor = ?, stock = ?, descripcion = ?, imagen = ? WHERE id = ?', [nombre, modelo, precio, categoria, idProveedor, stock, descripcion, imagen, id], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.send('Error al actualizar el proveedor');
//             } else {
//                 console.log('Proveedor actualizado exitosamente');
//                 res.redirect('/productos');
//             }
//         });
//     });
// };

// Importa tu lógica para interactuar con la base de datos
// Puedes usar tu lógica para obtener productos desde la base de datos


//Exportamos el objeto
module.exports = controller;