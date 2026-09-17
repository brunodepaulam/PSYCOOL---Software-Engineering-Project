const { pagamento, agenda } = require('../1models');

async function listar(req, res) {
    try {
        const pagamentos = await pagamento.findAll({
            include: [{ model: agenda, as: 'agenda' }]
        });
        res.json(pagamentos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function buscar(req, res) {
    try {
        const registropagamento = await pagamento.findByPk(req.params.id, {
            include: [{ model: agenda, as: 'agenda'}]
        });
        if (!registropagamento) {
            return res.status(404).json({ erro: 'Pagamento não encontrado!' });
        }
        res.json(registropagamento);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function inserir(req, res) {
    try {
        const {
            id_agenda_pagamento,
            preco_final,
            forma_pagamento,
            situacao_pagamento
        } = req.body;

        const novopagamento = await pagamento.create({
            id_agenda_pagamento,
            preco_final,
            forma_pagamento,
            situacao_pagamento
        });

        res.status(201).json(novopagamento);
    } catch (erro) {
        if (erro.name === 'SequelizeValidationError') {
            return res.status(400).json({
                erro: 'Dados inválidos',
                detalhes: erro.errors.map(e => ({
                    campo: e.path,
                    mensagem: e.message
                }))
            });
        }
        if (erro.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).json({
                erro: 'Agenda informada não existe'
            });
        }
        res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const registropagamento = await pagamento.findByPk(req.params.id);
        if (!registropagamento) {
            return res.status(404).json({ erro: 'Pagamento não encontrado!' });
        }

        const {
            id_agenda_pagamento,
            preco_final,
            forma_pagamento,
            situacao_pagamento
        } = req.body;

        await registropagamento.update({
            id_agenda_pagamento,
            preco_final,
            forma_pagamento,
            situacao_pagamento
        });

        res.json(registropagamento);
    } catch (erro) {
        if (erro.name === 'SequelizeValidationError') {
            return res.status(400).json({
                erro: 'Dados inválidos',
                detalhes: erro.errors.map(e => ({
                    campo: e.path,
                    mensagem: e.message
                }))
            });
        }
        if (erro.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).json({ erro: 'Agenda informada não existe' });
        }
        res.status(500).json({ erro: erro.message });
    }
}

async function excluir(req, res) {
    try {
        const registropagamento = await pagamento.findByPk(req.params.id);
        if (!registropagamento) {
            return res.status(404).json({ erro: 'Pagamento não encontrado!' });
        }
        await registropagamento.destroy();
        res.json({ mensagem: 'Pagamento removido com sucesso!' });
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