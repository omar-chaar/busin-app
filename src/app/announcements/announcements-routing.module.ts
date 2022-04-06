import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsPage } from './announcements.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsPageRoutingModule {}
