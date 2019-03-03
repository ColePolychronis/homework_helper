import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

import { event } from '../home/types';
 
@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
 
  // event = { 
  //   startTime: new Date().toISOString(), 
  //   endTime: new Date().toISOString(), 
  //   // allDay: false 
  //   confidence: 3,
  //   easyHard: 3,
  //   timeCompleteion: new Date().toISOString()
  // };

  event = new event();

  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    console.log(navParams.data)
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }
 
}