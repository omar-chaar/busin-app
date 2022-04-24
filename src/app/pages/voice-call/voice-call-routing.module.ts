import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoiceCallPage } from './voice-call.page';

const routes: Routes = [
  {
    path: '',
    component: VoiceCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoiceCallPageRoutingModule {}
