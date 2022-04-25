import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDepartmentPage } from './add-department.page';

const routes: Routes = [
  {
    path: '',
    component: AddDepartmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDepartmentPageRoutingModule {}
