import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private URI = 'http://localhost:3000/itens';
  
  constructor(
    private httpClient:HttpClient
  ) { }
    
  getItens() {
    return this.httpClient.get<Item[]>(this.URI);
  }

  getItem(id: number) {
    return this.httpClient.get<Item>(`${this.URI}/${id}`);
  }
  
  excluir(item: Item) {
    return this.httpClient.delete(`${this.URI}/${item.id}`);
  }

  private adicionar(item: Item) {
    return this.httpClient.post(this.URI, item);
  }

  private atualizar(item: Item) {
    return this.httpClient.put(`${this.URI}/${item.id}`, item);
  }

  salvar(item: Item) {
    if(item.id) {
      return this.atualizar(item);
    } else {
      return this.adicionar(item);
    }
  }
  
}
