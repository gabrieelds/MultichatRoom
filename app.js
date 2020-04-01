const app = require('./config/server.js');

var server = app.listen(3000, function(){
	console.log('Server ON');
});

const io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
	console.log('Usuário conectado');
	socket.on('disconnect', function(){
		console.log('Usuário desconectado');
	});

	socket.on('msgParaServidor', function(data){
		socket.emit(
			'msgParaClient',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaClient',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		if(parseInt(data.apelido_client) == 0){
			socket.emit(
				'usuariosParaClient',
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'usuariosParaClient',
				{apelido: data.apelido}
			);		
		}
	});

});
