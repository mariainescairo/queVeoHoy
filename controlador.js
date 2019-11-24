var con = require('../lib/conexionbd');

function cargarListado (req,resp){
    var titulo = req.query.titulo;
    var anio = req.query.anio;
    var genero = req.query.genero;
    var ordenColumna = req.query.columna_orden;
    var ordenTipo = req.query.tipo_orden;
    var pagina=req.query.pagina;
    var cantidad=req.query.cantidad;
    var limit = ((pagina - 1) * cantidad)+ "," + cantidad;
    var total = 'SELECT COUNT (*) AS TOTAL FROM pelicula';

    var sql = 'SELECT * FROM pelicula WHERE 1=1 '
        if(titulo){ 
            sql+='AND titulo LIKE '+'"%'+titulo +'%"'
        }
        if(anio){
            sql+='AND anio = '+'"'+anio +'"'
        }
        if(genero){
            sql+='AND genero_id = '+'"'+genero+'"'
        }
        if(ordenTipo){
            sql+= 'ORDER BY ' + ordenColumna + " " + ordenTipo
        }
            sql+=' LIMIT ' + limit;
    
con.query(sql, function(error, resultado, fields) {
    //si hubo un error, se informa y se envía un mensaje de error
    if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return resp.status(404).send("Hubo un error en la consulta");
    }
    //si no hubo error, se crea el objeto respuesta con las peliculas encontradas
    var respuesta = {
            peliculas: resultado,
            total:"",
    };

con.query(total, function(error, resultadoTotal, fields) {
    //si hubo un error, se informa y se envía un mensaje de error
    if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return resp.status(404).send("Hubo un error en la consulta");
    }
    //a la propiedad (total:"") del objeto respuesta se le asigna el valor del resultado(resultadoTotal) de la consulta resumido en TOTAL
    respuesta.total = resultadoTotal[0].TOTAL;

    //se envía la respuesta
    resp.send(JSON.stringify(respuesta));
        });
    });
};

module.exports = {
    cargarListado : cargarListado,
}