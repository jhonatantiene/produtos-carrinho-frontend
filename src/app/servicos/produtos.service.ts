import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../interfaces/interfaceProdutos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>('http://localhost:3000/produtos')
  }

  cadastrar(produto: Produto) {
    return this.http.post('http://localhost:3000/produtos/cadastrar', produto)
  }
}


