const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaCliente')
const Cliente = require('./Cliente')
const Serializador = require('../../Serializador').SerializadorCliente

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const clientes = await Tabela.listar()
    const serializador = new Serializador(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(clientes)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const corpo = requisicao.body
        const cliente = new Cliente(corpo)
        await cliente.criar()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type')
        )
        resposta.status(201)
        resposta.send(
            serializador.serializar(cliente)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:id', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, PUT')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id

    }
    const cliente = new Cliente(dados)
    await cliente.apagar()
    resposta.status(204)
    resposta.end()
})

roteador.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = {
            id: requisicao.params.id
        }
    
        const cliente = new Cliente(dados)
        await cliente.carregar()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type'),
            []
        )
        resposta.send(
            serializador.serializar(cliente)
        )
    } catch (erro) {
        proximo(erro)
    }
})


roteador.get('/procurarPorNome/:nomeCliente', async (requisicao, resposta, proximo) => {
    try {
        
        const nome = requisicao.params.nomeCliente
        const cliente = new Cliente({nome_completo: nome})
        await cliente.carregarPorNome()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type'),
            []
        )
        resposta.send(
            serializador.serializar(cliente)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = Object.assign(
            {},
            requisicao.body,
            {
                id: requisicao.params.id
                
            }
        )
    
        const cliente = new Cliente(dados)
        await cliente.atualizar()
        await cliente.carregar()
        
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador