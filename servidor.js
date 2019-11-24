//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladorListado = require('./controladores/controlador');
var controladorGeneros = require('./controladores/controladorGeneros');
var controladorPeliculasPorId = require('./controladores/controladorPeliculasPorId');
var controladorRecomendaciones = require('./controladores/controladorRecomendaciones');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//cuando se llama a la ruta /peliculas?, se ejecuta la acción cargarListado.
app.get('/peliculas?', controladorListado.cargarListado);
//cuando se llama a la ruta /generos, se ejecuta la acción cargarGeneros
app.get('/generos', controladorGeneros.cargarGeneros);
//cuando se llama a la ruta /recomendaciones, se ejecuta la acción recomendarPelicula
app.get('/peliculas/recomendacion', controladorRecomendaciones.recomendarPelicula);
//cuando se llama a la ruta /peliculas/:id se ejecuta la accion cargarPeliculasPorId
app.get('/peliculas/:id', controladorPeliculasPorId.cargarPeliculasPorId);

app.post('/estudiante/:nombre/nota', function (req, res){
	var estudiantes = {'Juan': [10,8,7], 'Ale': [4,6,7], 'Fran': [9,8,8]};
	var nombre = req.params.nombre;
	if (!(nombre && nombre in estudiantes)){
		return res.status(404).send("No se encuentra");
	}
	var notas = estudiantes[nombre];
	notas.push(req.body.nota);
	res.status(200).send(notas);
});

app.get('/estudiante/:nombre/promedio', function (req, res){
	var nombre = req.params.nombre;
	var estudiantes = {'Juan': [10,8,7], 'Ale': [4,6,7], 'Fran': [9,8,8]};
	if (!(nombre && nombre in estudiantes)){
		return res.status(404).send("No se encuentra el estudiante");
	}
	var notas = estudiantes[nombre];
	var suma = notas.reduce(function(a, b) { return a + b; }); 
	var promedio = suma / notas.length;
	res.json(promedio);
});



//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

