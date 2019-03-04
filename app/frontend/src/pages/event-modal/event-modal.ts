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

  // assigns = new classAssigns();
  classes = ["Mathematics", "Language & Literature", "Science", "Foreign Language", "Social Studies"];
  assigns = {
    "Mathematics": ["Homework", "Online Activity", "Reading", "Takehome Test", "Study Guide", "Presentation"],
    "Language & Literature": ["Reading", "Writing Prompt", "Essay", "Presentation"],
    "Science": ["Homework", "Lab", "Reading", "Takehome Test", "Study Guide", "Presentation"],
    "Foreign Language": ["Reading", "Translation Activity", "Homework", "Interview"],
    "Social Studies": ["Homework", "Reading", "Essay", "Presentation"]
  }
  classSelected = 0;

  event = new event();

  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
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