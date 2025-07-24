import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Produto } from '../interfaces/interfaceProdutos';
import { CarrinhoService } from '../servicos/carrinho.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-carrinho',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})

export class CarrinhoComponent implements OnInit, OnDestroy {

  constructor(private carrinhoService: CarrinhoService, private snackBar: MatSnackBar, private router: Router) { }

  itens: Produto[] = [];
  routerSubscription!: Subscription;
  caminhoDaImg = environment.apiUrl

  ngOnInit(): void {
    this.atualizarCarrinho()
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url.includes('carrinho')) {
        this.atualizarCarrinho();
      }
    });
  }
  
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  atualizarCarrinho(): void {
    this.itens = this.carrinhoService.listar();
  }

  remover(id: number) {
    this.carrinhoService.remover(id)
    this.itens = this.carrinhoService.listar()
    this.mostrarMensagem('Produto removido do carrinho')
  }

  aumentarQuantidade(item: Produto) {
    if (item.quantidade! < 20) {
      item.quantidade!++;
      this.carrinhoService.atualizarQuantidade(item.id, item.quantidade!);
    }
  }

  diminuirQuantidade(item: Produto) {
    if (item.quantidade! > 1) {
      item.quantidade!--;
      this.carrinhoService.atualizarQuantidade(item.id, item.quantidade!);
    }
  }

  total(): number {
    return this.carrinhoService.total()
  }

  continuarComprando(): void {
    history.back()
  }


  mostrarMensagem(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000, // 3 segundos
      panelClass: ['snackbar-sucesso'] // estilo opcional
    })
  }
}
