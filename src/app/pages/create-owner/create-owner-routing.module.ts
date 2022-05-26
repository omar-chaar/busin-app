import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOwnerPage } from './create-owner.page';

const routes: Routes = [
  {
    path: '',
    component: CreateOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOwnerPageRoutingModule {}
