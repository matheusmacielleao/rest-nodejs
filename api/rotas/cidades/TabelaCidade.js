const Modelo = require('./ModeloTabelaCidade')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar () {
        return Modelo.findAll({ raw: true })
    },
    listarPorEstado(estado) {
        return Modelo.findAll({ 
            where: {
                estado: estado
            },
            raw: true })
    },
    inserir (cidade) {
        return Modelo.create(cidade)
    },
    async pegarPorId (id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new NaoEncontrado('Cidade')
        }

        return encontrado
    },
    async pegarPorNome(nome) {
        const encontrado = await Modelo.findOne({
            where: {
                nome: nome            
            },
            raw: true
        })

        if (!encontrado) {
            throw new NaoEncontrado('Cidade')
        }

        return encontrado
    },
    atualizar (id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    },
    remover (id) {
        return Modelo.destroy({
            where: { id: id }
        })
    }
}