const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const pagamento = sequelize.define('pagamento', {

    id_pagamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_agenda_pagamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'agenda',
            key: 'id_agenda'
        }
    },

    preco_final: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },

    forma_pagamento: {
        type: DataTypes.STRING(55),
        allowNull: false,
        validate: {
            isIn: [[
                'DINHEIRO',
                'PIX',
                'CARTAO DE CREDITO',
                'CARTAO DE DEBITO',
                'BOLETO',
                'A PRAZO'
            ]]
        }
    },

    situacao_pagamento: {
        type: DataTypes.STRING(55),
        allowNull: false,
        validate: {
            isIn: [[
                'PAGO',
                'AGUARDANDO PAGAMENTO',
                'PAGO COM ATRASO',
                'PAGAMENTO ATRASADO'
            ]]
        }
    },

}, {
    tableName: 'pagamento',
    timestamps: false
});

pagamento.associate = (models) => {
    pagamento.belongsTo(models.agenda, {
        foreignKey: 'id_agenda_pagamento',
        as: 'agenda'
    });
};

module.exports = pagamento;