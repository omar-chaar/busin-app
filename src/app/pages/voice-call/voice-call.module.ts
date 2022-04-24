import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoiceCallPageRoutingModule } from './voice-call-routing.module';

import { VoiceCallPage } from './voice-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoiceCallPageRoutingModule
  ],
  declarations: [VoiceCallPage]
})
export class VoiceCallPageModule {}
