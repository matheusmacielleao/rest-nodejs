const Tabela = require('./TabelaCliente')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')
const CampoInvalido = require('../../erros/CampoInvalido')

class Cliente {
    constructor ({ id, nome_completo, genero, data_nascimento, idade,cidade}) {
        this.id = id
        this.nome_completo = nome_completo
        this.genero = genero
        this.idade = idade
        this.data_nascimento = data_nascimento
        this.cidade = cidade
    }

    validar () {
        if (typeof this.nome_completo !== 'string' || this.nome_completo.length === 0) {
            //throw new CampoInvalido('nome_completo')
        }
    }

    async criar () {
        this.validar()
        const resultado = await Tabela.inserir({
            nome_completo: this.nome_completo,
            data_nascimento: this.data_nascimento,
            genero: this.genero,
            idade: this.idade,   
            cidade: this.cidade
        })

        this.id = resultado.id
    }

    apagar () {
        return Tabela.remover(this.id, this.cidade)
    }

    async carregar () {
        const cliente = await Tabela.pegarPorId(this.id)
        this.nome_completo = cliente.nome_completo
        this.genero = cliente.genero
        this.idade = cliente.idade
        this.cidade = cliente.cidade
        this.data_nascimento = cliente.data_nascimento
    }
    async carregarPorNome() {
        const cliente = await Tabela.pegarPorNome(this.nome_completo)
        this.id = cliente.id
        this.genero = cliente.genero
        this.idade = cliente.idade
        this.cidade = cliente.cidade
        this.data_nascimento = cliente.data_nascimento
    }

    atualizar () {
        const dadosParaAtualizar = {}
        
        if (typeof this.nome_completo === 'string' && this.nome_completo.length > 0){
            dadosParaAtualizar.nome_completo = this.nome_completo
        }

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        return Tabela.atualizar(
            {
                id: this.id
            },
            dadosParaAtualizar
        )
    }

}

module.exports = Cliente