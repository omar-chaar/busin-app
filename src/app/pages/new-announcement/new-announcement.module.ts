import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAnnouncementPageRoutingModule } from './new-announcement-routing.module';

import { NewAnnouncementPage } from './new-announcement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAnnouncementPageRoutingModule
  ],
  declarations: [NewAnnouncementPage]
})
export class NewAnnouncementPageModule {}
