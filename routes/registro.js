module.exports = (app)=>{
    //abrir o arquivo registro.js
    app.get('/registro',(req,res)=>{
        res.render('registro.ejs')
    })

    //gravar as informações digitadas no mongoAtlas
    app.post('/registro',async(req,res)=>{
        //recuperar as informações digitadas
        var dados = req.body
        //importar as configurações do database
        var database = require('../config/database')()
        //definir em qual coleção vamos gravar
        var usuarios = require('../models/usuarios')
        //vereficar se o email ja esta cadastrado
        var vereficar = await usuarios.findOne({email:dados.email})
        if(vereficar){
            return res.send('Email já cadastrado')
        }
        //criptografar a senha
        var cript = require("bcryptjs")
        var senhasegura = await cript.hash(dados.senha,10)
        
        //gravar o documento
        var documento = await new usuarios({
            nome:dados.nome,
            email:dados.email,
            senha:senhasegura
        }).save()
        res.redirect('/login')
    })
}