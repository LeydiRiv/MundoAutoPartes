
rProductos = (req, res) => {
    const datosA = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into productos set ?', [datosA], (err, datosA) => {
            res.redirect('productos.html');
        });
    });
};