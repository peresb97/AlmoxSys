import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  fornecedor: Fornecedor;

  constructor(
    private fornecedorService : FornecedorService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.fornecedor = { 
      nome: '',
      cpfCnpj: '',
    };
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.fornecedorService.getFornecedor(id).subscribe((fornecedor) => {
        this.fornecedor = fornecedor;
        loading.dismiss();
      });
    } 
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.fornecedorService
      .salvar(this.fornecedor)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/fornecedores']);
      });
  }

}
