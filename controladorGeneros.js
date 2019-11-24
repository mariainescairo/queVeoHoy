var con = require('../lib/conexionbd');

function cargarGeneros (req,resp){
    var sql = 'select * from genero';
        con.query(sql, function(error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return resp.status(404).send("Hubo un error en la consulta");
        }
        //si no hubo error, se crea el objeto respuesta con los generos encontrados
        var respuesta = {
            generos:resultado
        };
        //se envía la respuesta
        resp.send(JSON.stringify(respuesta));
        })
}

module.exports = {
    cargarGeneros: cargarGeneros
}