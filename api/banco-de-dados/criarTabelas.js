const modelos = [
    require('../rotas/cidades/ModeloTabelaCidade'),
    require('../rotas/clientes/ModeloTabelaCliente')
]

async function criarTabelas () {
    for (let contador = 0; contador < modelos.length; contador++) {
        const modelo = modelos[contador]
        await modelo.sync()
    }
}

criarTabelas()