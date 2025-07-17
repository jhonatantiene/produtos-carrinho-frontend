import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./produtos/lista-produtos/lista-produtos.component').then(m => m.ListaProdutosComponent),
    data: { animation: 'Home' }
  },
  {
    path: 'produtos',
    loadComponent: () =>
      import('./produtos/lista-produtos/lista-produtos.component').then(m => m.ListaProdutosComponent),
    data: { animation: 'Produtos' }
  },
  {
    path: 'detalhes/:id',
    loadComponent: () =>
      import('./produtos/detalhes-produto/detalhes-produto.component').then(m => m.DetalhesProdutoComponent),
    data: { animation: 'Detalhes' }
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./produtos/cadastro-produtos/cadastro-produtos.component').then(m => m.CadastroProdutosComponent),
    data: { animation: 'Cadastro' }
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./carrinho/carrinho.component').then(m => m.CarrinhoComponent),
    data: { animation: 'Carrinho' }
  }
];
