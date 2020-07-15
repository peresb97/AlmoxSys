import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { Fornecedor } from 'src/app/models/fornecedor.interface';
import { NavController } from '@ionic/angular';
import { BusyLoaderService } from 'src/app/services/busy-loader.service';
import { Item } from 'src/app/models/item.interface';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  item: Item;
  fornecedores: Fornecedor[];

  constructor(
    private fornecedorService: FornecedorService,
    private itemService: ItemService,
    private busyLoader: BusyLoaderService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) { 
    this.item = {
      descricao: '',
      fornecedores: [],
      preco: 0.00,
      entrada: new Date(),
    };
  }

  ngOnInit() {
    this.listarFornecedores();
  }

  async listarFornecedores() {
    const busyLoader = await this.busyLoader.create('Carregando fornecedores...');
    
    this.fornecedorService.getFornecedores().subscribe((fornecedores) => {
      this.fornecedores = fornecedores;
      this.carregarItem();
      busyLoader.dismiss();
    });
  }

  carregarItem() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.itemService.getItem(id).subscribe(item => this.item = item);
    }
  }

  compareWith(fornecedor1: Fornecedor, fornecedor2: Fornecedor) {
    return fornecedor1 && fornecedor2 ? fornecedor1.id === fornecedor2.id : fornecedor1 === fornecedor2;
  };

  async salvar(item: Item) {
    const loading = await this.busyLoader.create('Salvando item...');

    this.itemService
      .salvar(item)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/itens']);
      });
  }

}
