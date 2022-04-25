import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinTwoPage } from './join-two.page';

const routes: Routes = [
  {
    path: '',
    component: JoinTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinTwoPageRoutingModule {}
