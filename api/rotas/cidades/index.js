const roteador = require('express').Router()
const TabelaCidade = require('./TabelaCidade')
const Cidade = require('./Cidade')
const SerializadorCidade = require('../../Serializador').SerializadorCidade

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaCidade.listar()
    resposta.status(200)
    const serializador = new SerializadorCidade(
        resposta.getHeader('Content-Type'),
        ['empresa']
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const cidade = new Cidade(dadosRecebidos)
        await cidade.criar()
        resposta.status(201)
        const serializador = new SerializadorCidade(
            resposta.getHeader('Content-Type'),
            ['empresa']
        )
        resposta.send(
            serializador.serializar(cidade)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:idCidade', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/:idCidade', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idCidade
        const Cidade = new Cidade({ id: id })
        await Cidade.carregar()
        resposta.status(200)
        const serializador = new SerializadorCidade(
            resposta.getHeader('Content-Type'),
            ['email', 'empresa', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        resposta.send(
            serializador.serializar(Cidade)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:idCidade', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idCidade
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const Cidade = new Cidade(dados)
        await Cidade.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idCidade', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idCidade
        const Cidade = new Cidade({ id: id })
        await Cidade.carregar()
        await Cidade.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})


const verificarCidade = async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idCidade
        const cidade = new Cidade({ id: id })
        await cidade.carregar()
        requisicao.Cidade = cidade
        proximo()
    } catch (erro) {
        proximo(erro)
    }
}

module.exports = roteador