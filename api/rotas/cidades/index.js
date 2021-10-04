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

roteador.get('/procurarPorEstado/:estadoCidade', async (requisicao, resposta) => {
    const estado = requisicao.params.estadoCidade
    const resultados = await TabelaCidade.listarPorEstado(estado)
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
        const cidade = new Cidade({ id: id })
        await cidade.carregar()
        resposta.status(200)
        const serializador = new SerializadorCidade(
            resposta.getHeader('Content-Type'),
            ['email', 'empresa', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        resposta.send(
            serializador.serializar(cidade)
        )
    } catch (erro) {
        proximo(erro)
    }
})
roteador.get('/procurarPorNome/:nomeCidade', async (requisicao, resposta, proximo) => {
    try {
        const nome = requisicao.params.nomeCidade
        const cidade = new Cidade({ nome:nome })
        await cidade.carregarPorNome()
        resposta.status(200)
        const serializador = new SerializadorCidade(
            resposta.getHeader('Content-Type'),
            ['email', 'empresa', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        resposta.send(
            serializador.serializar(cidade)
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
        const cidade = new Cidade(dados)
        await cidade.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idCidade', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idCidade
        const cidade = new Cidade({ id: id })
        await cidade.carregar()
        await cidade.remover()
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