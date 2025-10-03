var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function(){
    console.log('Servidor corriendo en http://localhost:4000');
});
// Configurar el servidor para escuchar en todas las interfaces de red
const PORT = 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});


app.use(express.static('public'));

// ⬇️ MODIFICACIÓN CRÍTICA: INCLUIR CORS PARA PERMITIR LA CONEXIÓN DESDE AWS
var io = socket(server, {
    cors: {
        
        origin: "https://localhost:4000", 
        methods: ["GET", "POST"]
    }
});
// ⬆️ FIN DE LA MODIFICACIÓN ⬆️

io.on('connection', function(socket){
    console.log('Hay una conexion', socket.id);

    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
