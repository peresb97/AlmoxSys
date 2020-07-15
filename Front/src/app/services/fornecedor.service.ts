import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fornecedor } from '../models/fornecedor.interface';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private URI = 'http://localhost:3000/fornecedores';

  constructor(
    private httpClient : HttpClient
  ) { }

  getFornecedores() {
    return this.httpClient.get<Fornecedor[]>(this.URI);
  }

  getFornecedor(id: number) {
    return this.httpClient.get<Fornecedor>(`${this.URI}/${id}`);
  }

  adicionar(fornecedor: Fornecedor) {
    return this.httpClient.post<Fornecedor>(this.URI, fornecedor);
  }

  atualizar(fornecedor: Fornecedor) {
    return this.httpClient.put<Fornecedor>(`${this.URI}/${fornecedor.id}`, fornecedor);
  }

  excluir(fornecedor: Fornecedor) {
    return this.httpClient.delete(`${this.URI}/${fornecedor.id}`);
  }

  salvar(fornecedor: Fornecedor) {
    if (fornecedor && fornecedor.id) {
      return this.atualizar(fornecedor);
    } else {
      return this.adicionar(fornecedor);
    }
  }
}
