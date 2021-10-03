const TabelaCidade = require('./TabelaCidade')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Fornecedor {
    constructor ({ id, estado, nome}) {
        this.id = id
        this.estado = estado
        this.nome = nome
        
    }

    async criar () {
        this.validar()
        const resultado = await TabelaCidade.inserir({
            estado: this.estado,
            nome: this.nome
            
        })

        this.id = resultado.id
    }
    
    async carregar () {
        const encontrado = await TabelaCidade.pegarPorId(this.id)
        this.estado = encontrado.estado
        this.nome = encontrado.nome
        
    }

    async atualizar () {
        await TabelaCidade.pegarPorId(this.id)
        const campos = ['estado', 'nome']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaCidade.atualizar(this.id, dadosParaAtualizar)
    }

    remover () {
        return TabelaCidade.remover(this.id)
    }

    validar () {
        const campos = ['estado', 'nome']

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0) {
                //throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Fornecedor