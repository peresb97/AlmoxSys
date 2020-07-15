import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItensPageRoutingModule } from './itens-routing.module';

import { ItensPage } from './itens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItensPageRoutingModule
  ],
  declarations: [ItensPage]
})
export class ItensPageModule {}
