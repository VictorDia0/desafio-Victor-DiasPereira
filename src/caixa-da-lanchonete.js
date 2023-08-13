class CaixaDaLanchonete {
  constructor() {
    this.itens = [
      { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
      { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
      { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
      { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
      { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
      { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
      { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
    ];

    this.metodoDePagamento = [
      { nome: 'dinheiro', taxa: 0.95 },
      { nome: 'debito', taxa: 1 },
      { nome: 'credito', taxa: 1.03 }
    ];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    // Busca as informações do método de pagamento selecionado
    const metodoPagamentoInfo = this.metodoDePagamento.find(metodo => metodo.nome === metodoDePagamento);
    const codigosItens = itens.map(i => i.split(',')[0]);

    // Para iniciar o valor da compra 
    let valorTotal = 0;

    for (const i of itens) {
      const [codigo, quantidade] = i.split(',');
      const pedido = this.itens.find(item => item.codigo === codigo);

      if (!pedido) {
        return 'Item inválido!';
      }
      if (parseInt(quantidade, 10) === 0) {
        return 'Quantidade inválida!';
      }
      valorTotal += pedido.valor * parseInt(quantidade, 10);
    }

    if ((codigosItens.includes('chantily') && !codigosItens.includes('cafe')) ||
      (codigosItens.includes('queijo') && !codigosItens.includes('sanduiche'))) {
      return 'Item extra não pode ser pedido sem o principal';
    }

    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    if (metodoPagamentoInfo) {
      valorTotal = valorTotal * metodoPagamentoInfo.taxa;
      return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

    } else {
      return 'Forma de pagamento inválida!';
    }
  }
}
export { CaixaDaLanchonete };