import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/interfaceProdutos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private chaveLocalStorage = 'carrinho';
  private itens: Produto[] = [];

  constructor() {
    this.carregarItens();
  }

  private salvarNoLocalStorage(): void {
    localStorage.setItem(this.chaveLocalStorage, JSON.stringify(this.itens));
  }

  private carregarItens(): void {
    const dados = localStorage.getItem(this.chaveLocalStorage);
    this.itens = dados ? JSON.parse(dados) : [];
  }

  listar(): Produto[] {
    return this.itens;
  }

  adicionar(produto: Produto): void {
    const existente = this.itens.find((p) => p.id === produto.id);

    if (existente) {
      existente.quantidade! += produto.quantidade || 1;
    } else {
      this.itens.push({ ...produto, quantidade: produto.quantidade || 1 });
    }

    this.salvarNoLocalStorage();
  }

  remover(id: number): void {
    this.itens = this.itens.filter((p) => p.id !== id);
    this.salvarNoLocalStorage();
  }

  total(): number {
    return this.itens.reduce(
      (soma, item) => soma + item.preco * (item.quantidade || 1),
      0
    );
  }

  atualizarQuantidade(id: number, quantidade: number): void {
    const produto = this.itens.find((p) => p.id === id);
    if (produto && quantidade > 0) {
      produto.quantidade = quantidade;
      this.salvarNoLocalStorage();
    }
  }

  limparCarrinho(): void {
    this.itens = [];
    this.salvarNoLocalStorage();
  }
}