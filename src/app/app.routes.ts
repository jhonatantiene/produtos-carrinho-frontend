import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./produtos/lista-produtos/lista-produtos.component').then(m => m.ListaProdutosComponent)
    },

        {
        path: 'produtos',
        loadComponent: () => import('./produtos/lista-produtos/lista-produtos.component').then(m => m.ListaProdutosComponent)
    },

    {
        path: 'detalhes',
        loadComponent: () => import('./produtos/detalhes-produto/detalhes-produto.component').then(m => m.DetalhesProdutoComponent)
    },

    {
        path: 'cadastro',
        loadComponent: () => import('./produtos/cadastro-produtos/cadastro-produtos.component').then(m => m.CadastroProdutosComponent)
    },

    {
        path: 'carrinho',
        loadComponent: () => import('./carrinho/carrinho.component').then(m => m.CarrinhoComponent)
    }
];
