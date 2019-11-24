var con = require('../lib/conexionbd');

function recomendarPelicula (req,resp){
    var anio_inicio= req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;
    var genero = req.query.genero;

    var sql = 'select pelicula.*, genero.nombre from pelicula JOIN genero ON  pelicula.genero_id = genero.id WHERE 1=1 ';
        if(genero){
         sql+='AND nombre = "'+ genero+'"';
        }
        if(anio_inicio){
            sql+='AND anio BETWEEN '+ anio_inicio+' AND '+ anio_fin;
        }
        if(puntuacion){
            sql+='AND puntuacion = '+ puntuacion;
        }

    con.query(sql, function(error, resultado, fields) {
    //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return resp.status(404).send("Hubo un error en la consulta");
        }
    //si no hubo error, se crea el objeto respuesta con las peliculas encontradas
        var respuesta = {
            peliculas:resultado
        };
    //se envía la respuesta
    resp.send(JSON.stringify(respuesta));
    })
}

module.exports = {
    recomendarPelicula: recomendarPelicula
}