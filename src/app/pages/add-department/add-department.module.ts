import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDepartmentPageRoutingModule } from './add-department-routing.module';

import { AddDepartmentPage } from './add-department.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDepartmentPageRoutingModule
  ],
  declarations: [AddDepartmentPage]
})
export class AddDepartmentPageModule {}
