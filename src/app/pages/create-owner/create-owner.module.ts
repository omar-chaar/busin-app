import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateOwnerPageRoutingModule } from './create-owner-routing.module';

import { CreateOwnerPage } from './create-owner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOwnerPageRoutingModule
  ],
  declarations: [CreateOwnerPage]
})
export class CreateOwnerPageModule {}
