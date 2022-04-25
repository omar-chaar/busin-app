import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinTwoPageRoutingModule } from './join-two-routing.module';

import { JoinTwoPage } from './join-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinTwoPageRoutingModule
  ],
  declarations: [JoinTwoPage]
})
export class JoinTwoPageModule {}
