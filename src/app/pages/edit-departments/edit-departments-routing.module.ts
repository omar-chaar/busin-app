import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDepartmentsPage } from './edit-departments.page';

const routes: Routes = [
  {
    path: '',
    component: EditDepartmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDepartmentsPageRoutingModule {}
