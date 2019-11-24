var con = require('../lib/conexionbd');


function cargarPeliculasPorId (req,resp){
    var id = req.params.id;
    var sql = 'SELECT * FROM pelicula JOIN genero ON genero.id= pelicula.genero_id WHERE pelicula.id='+id;
        
        con.query(sql, function(error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return resp.status(404).send("No pudo encontrarse la pelicula buscada");
            }
    const pelicula = resultado[0];
    const genero = pelicula.nombre;

    sql = 'SELECT actor.nombre FROM actor JOIN actor_pelicula ON actor.id=actor_pelicula.actor_id AND pelicula_id='+id;
        con.query(sql, function(error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return resp.status(404).send("No pudo encontrarse la pelicula buscada");
                }
    const actores=resultado;

   //si no hubo error, se crea el objeto respuesta con las peliculas encontradas, los actores y el género
    var respuesta = {
        pelicula:pelicula,
        actores:actores,
        genero:genero
    };
    //se envía la respuesta
    resp.send(JSON.stringify(respuesta));
        });
    });
};

module.exports = {
    cargarPeliculasPorId: cargarPeliculasPorId
}