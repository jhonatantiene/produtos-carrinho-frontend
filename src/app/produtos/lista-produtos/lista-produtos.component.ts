import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProdutosService } from '../../servicos/produtos.service';
import { Produto } from '../../interfaces/interfaceProdutos';
@Component({
  selector: 'app-lista-produtos',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatGridListModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent implements OnInit {

  constructor(private produtosService: ProdutosService) {}

  produtos: Produto[] = []

  ngOnInit(): void {
    this.listarProdutos()
    
  }

  listarProdutos() {
    this.produtosService.buscarTodos().subscribe((res) => {
      this.produtos = res
      console.log(this.produtos)
    })
  }


}
