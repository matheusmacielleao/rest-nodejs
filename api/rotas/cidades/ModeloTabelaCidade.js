const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'cidade',
    timestamps: false
    
}

module.exports = instancia.define('cidade', colunas, opcoes)