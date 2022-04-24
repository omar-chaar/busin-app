import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDepartmentsPageRoutingModule } from './edit-departments-routing.module';

import { EditDepartmentsPage } from './edit-departments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDepartmentsPageRoutingModule
  ],
  declarations: [EditDepartmentsPage]
})
export class EditDepartmentsPageModule {}
