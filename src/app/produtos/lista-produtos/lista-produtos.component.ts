import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProdutosService } from '../../servicos/produtos.service';
import { Produto } from '../../interfaces/interfaceProdutos';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-lista-produtos',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss',
})
export class ListaProdutosComponent implements OnInit {
  constructor(private produtosService: ProdutosService) {}

  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  itemPorPagina = 10;
  pageIndex = 0;
  pesquisa: string = '';
  ordernarPor: string = 'nome';
  direcaoDeOrdenacao: 'asc' | 'desc' = 'asc';

  get produtosPaginados() {
    const start = this.pageIndex * this.itemPorPagina;
    const end = start + this.itemPorPagina;
    return this.produtosFiltrados.slice(start, end);
  }

  mudancaDaPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.itemPorPagina = event.pageSize;
  }

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtosService.buscarTodos().subscribe((res) => {
      this.produtos = res;
      this.pesquisarProduto();
    });
  }

  pesquisarProduto() {
    const input = this.pesquisa.trim().toLowerCase();

    if (input != '') {
      this.produtosFiltrados = this.produtos.filter((p) =>
        p.nome.toLowerCase().includes(input)
      );
    } else {
      this.produtosFiltrados = [...this.produtos];
    }

    this.pageIndex = 0;
  }

  filtrarProdutos() {
    const input = this.pesquisa.trim().toLowerCase();

    let resultado = this.produtos;

    // filtro por nome
    if (input) {
      resultado = resultado.filter((p) => p.nome.toLowerCase().includes(input));
    }

    // ordenação
    resultado = resultado.sort((a: any, b: any) => {
      const valorA = a[this.ordernarPor];
      const valorB = b[this.ordernarPor];

      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return this.direcaoDeOrdenacao === 'asc'
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }

      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.direcaoDeOrdenacao === 'asc'
          ? valorA - valorB
          : valorB - valorA;
      }

      return 0;
    });

    this.produtosFiltrados = resultado;
    this.pageIndex = 0; // reset da página
  }

  alternarDirecao() {
    this.direcaoDeOrdenacao =
      this.direcaoDeOrdenacao === 'asc' ? 'desc' : 'asc';
    this.filtrarProdutos();
  }
}
