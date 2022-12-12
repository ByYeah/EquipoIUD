const express = require('express');

const app = express();

const jwt = require('jsonwebtoken');


const fileUpload = require('express-fileupload');
const cors = require('cors');

const usuarios = require('./routes/usuario');
const tiposEquipo = require('./routes/tipoEquipo');
const estados = require('./routes/estado');
const marcas = require('./routes/marca');

const inventarios = require('./routes/inventario');


//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cors());

//Registro
app.post('/api/signup' , (req,res) => {
    const id  = req.body.id;
    const usuarios = req.body.username;
    const password = req.body.password;
    jwt.sign(id , 'secret_key' , (err,token) => {
       if(err){
          res.status(400).send({msg : 'Error'})
       }
  else {
          res.send({msg:'success' , token: token})
       }
    })
 })

 //Middleware que verifica el roken
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403);
    jwt.verify(token, "secret_key", (err, user) => {
       if (err) return res.sendStatus(404);
       req.user = user;
       next();
    });
 }

//Iniciar Sesión

app.post('/api/login' , verifyToken , (req,res) => {
    res.send('You are Authorized!')
 })

app.use('/api/index', )
app.use('/api/usuarios', usuarios);
app.use('/api/tiposequipo', tiposEquipo);
app.use('/api/estados', estados);
app.use('/api/marcas', marcas);
app.use('/api/inventarios', inventarios);


module.exports = app;