//Cuando se hace una petición vamos a tener dos lementos
//req = petición, res = respuesta servidor
//Cliente = Cualquier navegador

const express= require('express');
//Constante para trabajar las rutas
const path=require('path');
//incluir morgan
const morgan=require('morgan');
//incluimos mysql
const mysql=require('mysql');
//Incluimos el módulo de conexión
const myConnection=require('express-myconnection');

const session = require('express-session');

const app=express();

// Configuración de sesión
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

//Configuración de recursos estáticos
app.use(express.static('src'));
app.use(express.static('css'));
//importando rutas
const clienteRutas=require('./rutas/indexRutas');

// Después
app.use(express.urlencoded({ extended: true }));

//Configuramos el puerto de salida
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

//Establecer la ruta de las vistas
app.set('views', path.join(__dirname, 'views'));

//Vamos a usar morgan. Es unmiddleware
app.use(morgan('dev'));

//__Agregamos otro middleware agregar el miércoles
app.use(express.urlencoded({}));
//Indicando al servidor que escuche peticiones
app.listen(app.get('port'),()=>{
    console.log('Servidor trabajando ');
});

//Incluimos los datos de conexion con mysql
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'sergiogamer500',
    port:'3306',
    database:'autodb'
}, 'single'));

app.use(require('./rutas/indexRutas'));