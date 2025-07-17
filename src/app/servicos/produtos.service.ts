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
    return this.http.get<Produto[]>('https://produtos-api-production.up.railway.app/produtos')
  }

  buscarPorid(id: number | null): Observable<Produto> {
    return this.http.get<Produto>(`https://produtos-api-production.up.railway.app/produtos/${id}`)
  }

  cadastrar(produto: Produto) {
    return this.http.post('https://produtos-api-production.up.railway.app/produtos/cadastrar', produto)
  }
}


