import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.interface';
import { LoadingController, AlertController } from '@ionic/angular';
import { BusyLoaderService } from '../services/busy-loader.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.page.html',
  styleUrls: ['./itens.page.scss'],
})
export class ItensPage implements OnInit {

  itens: Item[];

  constructor(
    private itemService: ItemService,
    private busyLoader: BusyLoaderService,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const busyLoader = await this.busyLoader.create('Carregando itens ...');
    
    this.itens = await this.itemService.getItens().toPromise();
    busyLoader.dismiss();
  }

  async confirmacaoExclusao(item: Item) {
    const alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o item ${item.descricao}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(item)
        },
        {
          text: 'Não'
        }
      ]
    });
    alerta.present();       
  }

  private async excluir(item: Item) {
    const busyLoader = await this.busyLoader.create('Excluíndo ...');
    
    this.itemService.excluir(item).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
