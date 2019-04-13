import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CredentialModalPage } from './credential-modal';

@NgModule({
  declarations: [
    CredentialModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CredentialModalPage),
  ],
})
export class CredentialModalPageModule {}
