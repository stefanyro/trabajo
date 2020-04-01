const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//Inicio
const app = express(); 

//Configuraciones 
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views')); 
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
app.set('json spaces', 2);

//peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Variables globales
app.use((req,res,next)=>{
    next();
});

//Rutas 
app.use(require('./routes')); 
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));
app.use('/api/pedidos',require('./routes/pedidos'));
app.use('/api/productos',require('./routes/productos'));
app.use('/api/usuarios',require('./routes/usuarios'));

//Public
app.use(express.static (path.join(__dirname, 'public')));

//Inicia el server 
app.listen(app.get('port'),() =>{
    console.log('serve on port', app.get('port'));
}); 

