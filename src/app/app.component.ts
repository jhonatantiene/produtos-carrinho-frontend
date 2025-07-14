import { Component } from '@angular/core';
import { ListaProdutosComponent } from "./produtos/lista-produtos/lista-produtos.component";

@Component({
  selector: 'app-root',
  imports: [ListaProdutosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'produtos-carrinho-frontend';
}
