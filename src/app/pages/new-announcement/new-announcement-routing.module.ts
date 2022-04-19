import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAnnouncementPage } from './new-announcement.page';

const routes: Routes = [
  {
    path: '',
    component: NewAnnouncementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAnnouncementPageRoutingModule {}
