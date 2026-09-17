const { agenda } = require('../1models');

async function listar(req,res){
    try{
        const agendas = await agenda.findAll();
        res.json(agendas);
    }catch(erro) {
        res.status(500).json({ erro: erro.message });
    }

}

async function buscar(req,res){
    try{
        const registroagenda = await agenda.findByPk(req.params.id);
        if (!registroagenda) {
            return res.status(404).json({ erro: 'Agenda não encontrada!'});
        }
        res.json(registroagenda);
    } catch (erro) {
        res.status(500).json({erro:erro.message});
    }
}

async function inserir(req,res){
    try {
        const {
            id_cliente,
            id_psicologo,
            datahora_agenda,
            status_agenda,
            preco_base,
            desconto_convenio,
            preco_final
        } = req.body;
        const novaagenda = await agenda.create({
            id_cliente,
            id_psicologo,
            datahora_agenda,
            status_agenda,
            preco_base,
            desconto_convenio: desconto_convenio || 0,
            preco_final
        });
        res.status(201).json(novaagenda);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req,res){
    try{
        const registroagenda = await agenda.findByPk(req.params.id);
        if(!registroagenda) {
            return res.status(404).json({ erro: 'Agenda não encontrada!'});
        }
        const {
            id_cliente,
            id_psicologo,
            datahora_agenda,
            status_agenda,
            preco_base,
            desconto_convenio,
            preco_final
        } = req.body;
        await registroagenda.update({
            id_cliente,
            id_psicologo,
            datahora_agenda,
            status_agenda,
            preco_base,
            desconto_convenio,
            preco_final
        });
        res.json(registroagenda);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function excluir(req,res){
    try{
        const registroagenda = await agenda.findByPk(req.params.id);
        if (!registroagenda) {
            return res.status(404).json({ erro: 'Agenda não encontrada!' });
        }
        await registroagenda.destroy();
        res.json({ mensagem: 'Agenda removida com sucesso!'});
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