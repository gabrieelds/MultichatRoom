module.exports.iniciaChat = function(app, req, res){
	let dadosForm = req.body;
	req.assert('apelido', 'Apelido é obrigatório').notEmpty();
	req.assert('apelido', 'Apelido deve conter entre 3 e 15 caracteres').len(3, 15);

	const err = req.validationErrors();

	if(err){
		res.render('index', {validacao: err});
		return;
	}

	app.get('io').emit(
		'msgParaClient',
		{apelido: dadosForm.apelido, mensagem: ' acabou de conectar-se ao chat'});

	res.render('chat.ejs', {dadosForm: dadosForm});
}