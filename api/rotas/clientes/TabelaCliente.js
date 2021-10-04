const Modelo = require('./ModeloTabelaCliente')
const instancia = require('../../banco-de-dados')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar() {
        return Modelo.findAll({ raw: true })
    },

    inserir (dados) {
        return Modelo.create(dados)
    },
    remover (idCliente) {
        return Modelo.destroy({
            where: {
                id: idCliente   
            }
        })
    },
    async pegarPorId (idCliente) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idCliente
               
            },
            raw: true
        })

        if (!encontrado) {
            throw new NaoEncontrado('Cliente')
        }

        return encontrado
    },
    async pegarPorNome(nomeCliente) {
        const encontrado = await Modelo.findOne({
            where: {
                nome_completo: nomeCliente

            },
            raw: true
        })

        if (!encontrado) {
            throw new NaoEncontrado('Cliente')
        }

        return encontrado
    },
    atualizar (dadosDoCliente, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDoCliente
            }
        )
    }
}