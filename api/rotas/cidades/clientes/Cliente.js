const Tabela = require('./TabelaCliente')
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos')
const CampoInvalido = require('../../../erros/CampoInvalido')

class Cliente {
    constructor ({ id, nome_completo, genero, data_nascimento, fornecedor, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.nome_completo = nome_completo
        this.genero = genero
        this.idade = idade
        this.data_nascimento = data_nascimento
        this.cidade = cidade
    }

    validar () {
        if (typeof this.nome_completo !== 'string' || this.nome_completo.length === 0) {
            throw new CampoInvalido('nome_completo')
        }
    }

    async criar () {
        this.validar()
        const resultado = await Tabela.inserir({
            nome_completo: this.nome_completo,
            genero: this.genero,
            idade: this.idade,
            data_nascimento: this.data_nascimento,
            cidade: this.cidade
        })

        this.id = resultado.id
    }

    apagar () {
        return Tabela.remover(this.id, this.cidade)
    }

    async carregar () {
        const produto = await Tabela.pegarPorId(this.id, this.cidade)
        this.nome_completo = produto.nome_completo
        this.idade = produto.idade
        this.data_nascimento = produto.data_nascimento
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
                id: this.id,
                cidade: this.cidade
            },
            dadosParaAtualizar
        )
    }

    diminuirdata_nascimento () {
        return Tabela.subtrair(
            this.id,
            this.cidade,
            'data_nascimento',
            this.data_nascimento
        )
    }
}

module.exports = Cliente