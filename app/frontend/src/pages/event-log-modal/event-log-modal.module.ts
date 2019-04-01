import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLogModalPage } from './event-log-modal';

@NgModule({
  declarations: [
    EventLogModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLogModalPage),
  ],
})
export class EventLogModalPageModule {}
