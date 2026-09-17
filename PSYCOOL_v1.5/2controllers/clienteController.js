const { cliente } = require('../1models');

async function listar(req,res){
    try{
        const clientes = await cliente.findAll();
        res.json(clientes);
    }catch(erro){
        res.status(500).json({erro:erro.message});
    }
}

async function buscar(req,res){
    try{
        const registrocliente = await cliente.findByPk(req.params.id_cliente);
        if (!registrocliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado!' });
        }
        res.json(registrocliente);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function inserir(req,res){
    try{
        const novocliente = await cliente.create(req.body);
        res.status(201).json(novocliente);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req,res){
    try{
        const registrocliente = await cliente.findByPk(req.params.id_cliente);
        if (!registrocliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado!' });
        }
        await registrocliente.update(req.body);
        res.json(registrocliente);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function excluir(req,res){
    try{
        const registrocliente = await cliente.findByPk(req.params.id_cliente);
        if (!registrocliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado!' });
        }
        await registrocliente.destroy();
        res.json({
            mensagem:"Cliente removido."
        });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listar,
    buscar,
    inserir,
    atualizar,
    excluir
};