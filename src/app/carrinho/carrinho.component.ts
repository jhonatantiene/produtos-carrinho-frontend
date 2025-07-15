import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})

export class CarrinhoComponent {
  itens = [
    { nome: 'Produto 1', preco: 100, quantidade: 10, imagem: '1.png' },
    { nome: 'Produto 2', preco: 50, quantidade: 2, imagem: '2.png' },
    { nome: 'Produto 3', preco: 50, quantidade: 2, imagem: '3.png' },
    { nome: 'Produto 4', preco: 50, quantidade: 2, imagem: '1.png' },
    { nome: 'Produto 5', preco: 50, quantidade: 2, imagem: '2.png' },
  ];

  removerItem(index: number): void {
    this.itens.splice(index, 1);
  }

  continuarComprando(): void {
    history.back();
  }
}
