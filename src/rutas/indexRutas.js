
const express=require('express');
const router=express.Router();
const controller = require('../controlador/indexControlador');


/* router.get('/perfilUsuario.ejs', controller.mostrarPerfilUsuario);
 */
router.get('/perfilUsuario.ejs', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    req.getConnection((err, conn) => {
      if (err) {
        // Manejar el error de conexión aquí
        res.status(500).send('Error de conexión a la base de datos');
        return;
      }
      // Llamada a la función con la conexión establecida
      controller.mostrarPerfilUsuario(req, res, conn);
    });
  } else {
    res.redirect('/login');
  }
});

/*rutas para las funciones dentro de la tabla*/
router.get('/', controller.index);
/*Inicio sesión*/
router.post('/sesion', controller.sesion);
/*Registrar un usuario*/
router.post('/registrar', controller.registerU);

router.post('/rprod', controller.registroprod);

router.get('/proveedores', controller.inicioProv);

//Guardar datos
router.post('/agregar', controller.saveP);

router.get('/eliminarA/:id', controller.deleteA);
//Consultar datos
router.get('/consultarA/:id', controller.consultA);
//Modificar datos
router.post('/consultarA/actualizarA/:id', controller.updateA);

// router.get('/consultarP/:id', controller.consultP)

/*Ruta del login al registro del usuario*/
router.get('/register.ejs', (req, res) => {
    res.render('register');
});

/*Ruta del registro de usuario al login*/
router.get('/login.ejs', (req, res) => {
    res.render('login');
  });
  
/*Ruta del registro de usuario al login*/
router.get('/marchas.ejs', (req, res) => {
  res.render('marchas');
});

router.get('/descripcion.ejs', (req, res) => {
  res.render('descripcion');
});

router.get('/quimicos.ejs', (req, res) => {
  res.render('quimicos');
});

router.get('/productos', (req, res) => {
  res.render('productos');
});

router.get('/proveedores.ejs', (req, res) => {
  res.redirect('proveedores');
});
/*----------------------------------------------------*/
router.get('/mostrar-alternador', (req, res) => {
  res.render('alternador');
});

// Mostrar desc1 alternador
router.get('/mostrar-alternador-desc1', (req, res) => {
  res.render('alternador_desc1');
});

// Mostrar desc2 alternador
router.get('/mostrar-alternador-desc2', (req, res) => {
  res.render('alternador_desc2');
});

// Mostrar desc3 alternador
router.get('/mostrar-alternador-desc3', (req, res) => {
  res.render('alternador_desc3');
});

// Mostrar desc4 alternador
router.get('/mostrar-alternador-desc4', (req, res) => {
  res.render('alternador_desc4');
});

// Vista general ARNES
router.get('/arnes', (req, res) => {
  res.render('arnes');
});

// Mostrar desc1 arnes
router.get('/mostrar-arnes-desc1', (req, res) => {
  res.render('arnes_desc1');
});

// Mostrar desc2 arnes
router.get('/mostrar-arnes-desc2', (req, res) => {
  res.render('arnes_desc2');
});

// Mostrar desc3 arnes
router.get('/mostrar-arnes-desc3', (req, res) => {
  res.render('arnes_desc3');
});

// Mostrar desc4 arnes
router.get('/mostrar-arnes-desc4', (req, res) => {
  res.render('arnes_desc4');
});

// Ruta para llamar a full-injection 
router.get('/mostrar-full-injection', (req, res) => {
  res.render('full-injection');
});

// Ruta para llamar a full-injection_desc1
router.get('/mostrar-full-injection-desc1', (req, res) => {
  res.render('full-injection_desc1');
});

// Ruta para llamar a full-injection_desc2
router.get('/mostrar-full-injection-desc2', (req, res) => {
  res.render('full-injection_desc2');
});

// Ruta para llamar a full-injection_desc3
router.get('/mostrar-full-injection-desc3', (req, res) => {
  res.render('full-injection_desc3');
});

// Ruta para llamar a full-injection_desc4
router.get('/mostrar-full-injection-desc4', (req, res) => {
  res.render('full-injection_desc4');
});

// Mostrando vista general de Iluminacion
router.get('/mostrar-iluminacion', (req, res) => {
  res.render('iluminacion');
});

// RUTA PARA MOSTRAR LA DESCRIPCIÓN DE ILUMINACION 1
router.get('/iluminacion-informacion1', (req, res) => {
  res.render('iluminacion_desc1');
});

// Mostrar descripcion de iluminacion 2
router.get('/iluminacion-informacion2', (req, res) => {
  res.render('iluminacion_desc2');
});

// Mostrar descripcion de iluminacion 3
router.get('/iluminacion-informacion3', (req, res) => {
  res.render('iluminacion_desc3');
});

// Mostrar descripcion de iluminacion 4
router.get('/iluminacion-informacion4', (req, res) => {
  res.render('iluminacion_desc4');
});

// VISTA GENERAL DE TERMINAL
router.get('/terminal', (req, res) => {
  res.render('terminal');
});

// Terminal - Información 1
router.get('/terminal-informacion1', (req, res) => {
  res.render('terminal_desc1');
});

// Terminal - Información 2
router.get('/terminal-informacion2', (req, res) => {
  res.render('terminal_desc2');
});

// Terminal - Información 3
router.get('/terminal-informacion3', (req, res) => {
  res.render('terminal_desc3');
});

// Terminal - Información 4
router.get('/terminal-informacion4', (req, res) => {
  res.render('terminal_desc4');
});

// Quimicos - Información 1
router.get('/quimicos-informacion1', (req, res) => {
  res.render('quimicos_desc1');
});

// Quimicos - Información 2
router.get('/quimicos-informacion2', (req, res) => {
  res.render('quimicos_desc2');
});

// Quimicos - Información 3
router.get('/quimicos-informacion3', (req, res) => {
  res.render('quimicos_desc3');
});

// Quimicos - Información 4
router.get('/quimicos-informacion4', (req, res) => {
  res.render('quimicos_desc4');
});

// Marcha - Información 1
router.get('/marcha-informacion1', (req, res) => {
  res.render('marcha_desc1');
});

// Marcha - Información 2
router.get('/marcha-informacion2', (req, res) => {
  res.render('marcha_desc2');
});

// Marcha - Información 3
router.get('/marcha-informacion3', (req, res) => {
  res.render('marcha_desc3');
});

// Marcha - Información 4
router.get('/marcha-informacion4', (req, res) => {
  res.render('marcha_desc4');
});
/*----------------------------------------------------*/

router.get('/editar_p.ejs', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    req.getConnection((err, conn) => {
      if (err) {
        // Manejar el error de conexión aquí
        res.status(500).send('Error de conexión a la base de datos');
        return;
      }
      // Llamada a la función con la conexión establecida
      controller.renderizarEditarPerfil(req, res, conn);
    });
  } else {
    res.redirect('/sesion.ejs');
  }
});


router.post('/guardarCambiosPerfil', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    req.getConnection((err, conn) => {
      if (err) {
        res.status(500).send('Error de conexión a la base de datos');
        return;
      }
      controller.actualizarPerfilUsuario(req, res, conn);
      
    });
  } else {
    res.redirect('/login'); // O la ruta que corresponda si el usuario no está autenticado
  }
});

router.get('/sesion', (req, res) => {
  // Lógica para cargar la vista de sesión
  res.render('principal');
});

module.exports=router;
