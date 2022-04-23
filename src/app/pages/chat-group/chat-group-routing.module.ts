import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatGroupPage } from './chat-group.page';

const routes: Routes = [
  {
    path: '',
    component: ChatGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatGroupPageRoutingModule {}
