import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../servicos/produtos.service';
import { Produto } from '../../interfaces/interfaceProdutos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detalhes-produto',
  imports: [MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.scss'
})
export class DetalhesProdutoComponent implements OnInit {

  produto: Produto | null = null
  erro: string = ''
  caminhoDaImg = environment.apiUrl

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarProduto();
  }

  carregarProduto() {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.produtosService.buscarPorid(id).subscribe({
      next: (res) => {
        this.produto = { ...res, quantidade: 1 }
      },
      error: (err) => {
        console.error('Erro ao buscar produto:', err)
        if (err.status === 404) {
          this.erro = 'Produto não encontrado.'
        } else {
          this.erro = 'Erro ao carregar o produto.'
        }
      }
    })
  }

  adicionarAoCarrinho() {
    if (this.produto) {

      if (this.produto.quantidade < 1) this.produto.quantidade = 1
      if (this.produto.quantidade > 20) this.produto.quantidade = 20

      // Adiciona no localStorage

      const carrinhoString = localStorage.getItem('carrinho')
      let carrinho = carrinhoString ? JSON.parse(carrinhoString) : []

      const index = carrinho.findIndex((item: any) => item.id === this.produto?.id)

      if (index >= 0) {
        const novaQuantidade = carrinho[index].quantidade + this.produto.quantidade
        carrinho[index].quantidade = Math.min(novaQuantidade, 20)
      } else {
        carrinho.push({ ...this.produto })
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinho))

      this.snackBar.open('Produto adicionado no carrinho!', 'Fechar', {
        duration: 3000
      })

    }
  }

  comprar() {
  console.log('Adicionando ao carrinho e redirecionando');
  this.adicionarAoCarrinho();
  window.location.href = '/carrinho';
  console.log('Depois do redirecionamento');
  }

}
