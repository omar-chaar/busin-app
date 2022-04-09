import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnnouncementsPage } from './announcements.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { AnnouncementsPageRoutingModule } from './announcements-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AnnouncementsPageRoutingModule
  ],
  declarations: [AnnouncementsPage]
})
export class AnnouncementsPageModule {}
