const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    nome_completo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    cidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../cidades/ModeloTabelaCidade'),
            key: 'id'
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'cliente',
    timestamps: false
    
}

module.exports = instancia.define('cliente', colunas, opcoes)