const { usuario } = require('../1models');

async function listar(req, res){
    try{
        const usuarios = await usuario.findAll();
        res.json(usuarios);
    }catch(erro){
        res.status(500).json({erro: erro.message});
    }
}

async function buscar(req, res){
    try{
        const registrousuario = await usuario.findByPk(req.params.id);
        if (!registrousuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado!' });
        }
        res.json(registrousuario);
    }catch(erro){
        res.status(500).json({erro: erro.message});
    }
}

async function inserir(req, res) {
    try {
        const novousuario = await usuario.create({
            tipo_usuario: req.body.tipo_usuario,
            email_usuario: req.body.email_usuario,
            senha_usuario: req.body.senha_usuario,
            ativo: req.body.ativo
        });
        res.status(201).json(novousuario);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res){
    try{
        const registrousuario = await usuario.findByPk(req.params.id);
        if (!registrousuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado!' });
        }
        await registrousuario.update({
            tipo_usuario: req.body.tipo_usuario,
            email_usuario: req.body.email_usuario,
            senha_usuario: req.body.senha_usuario,
            ativo: req.body.ativo
        });
        res.json(registrousuario);
    }catch(erro){
        res.status(500).json({erro: erro.message});
    }
}

async function excluir(req, res){
    try{
        const registrousuario = await usuario.findByPk(req.params.id);
        if (!registrousuario){
            return res.status(404).json({ erro: 'Usuário não encontrado!' })
        }
        await registrousuario.destroy();
        res.json({
            mensagem: "Usuário removido com sucesso."
        });
    }catch(erro){
        res.status(500).json({erro: erro.message});
    }
}

module.exports = {
    listar,
    buscar,
    inserir,
    atualizar,
    excluir
};