import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from '../models/fornecedor.interface';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.page.html',
  styleUrls: ['./fornecedores.page.scss'],
})
export class FornecedoresPage implements OnInit {

  fornecedores: Fornecedor[];

  constructor(
    private alertController: AlertController,
    private fornecedorService: FornecedorService,
    private loadingController: LoadingController 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    this.fornecedorService.getFornecedores().subscribe((data) => {
      this.fornecedores = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(fornecedor: Fornecedor) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o fornecedor ${fornecedor.nome}?`,
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.excluir(fornecedor);
        }
      }, {
        text: 'Não'
      }]
    });
    alerta.present();
  }

  private async excluir(fornecedor: Fornecedor) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.fornecedorService.excluir(fornecedor).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
