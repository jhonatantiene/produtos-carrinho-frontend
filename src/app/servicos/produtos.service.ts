import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../interfaces/interfaceProdutos';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${environment.apiUrl}/produtos`)
  }

  buscarPorid(id: number | null): Observable<Produto> {
    return this.http.get<Produto>(`${environment.apiUrl}/produtos/${id}`)
  }

  cadastrar(produto: FormData) {
    return this.http.post(`${environment.apiUrl}/produtos/cadastrar`, produto)
  }
}


