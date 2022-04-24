import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUsersPage } from './edit-users.page';

const routes: Routes = [
  {
    path: '',
    component: EditUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUsersPageRoutingModule {}
