// ==========================================================================================================
// 
// Typescript class for the EventModalPage page
// 
// This typescript class serves as the pop-up page that allows users to add a new assignment to be
// tracked by Homework Helper
// 
// ========================================================================================================== 

// import relevant components and pages
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
  // list of possible class types
  classes = ["Mathematics", "Language & Literature", "Science", "Foreign Language", "Social Studies"];
  // dictionary of possible assignment types, based on which class type is selected
  assigns = {
    "Mathematics": ["Homework", "Online Activity", "Reading", "Takehome Test", "Study Guide", "Presentation"],
    "Language & Literature": ["Reading", "Writing Prompt", "Essay", "Presentation"],
    "Science": ["Homework", "Lab", "Reading", "Takehome Test", "Study Guide", "Presentation"],
    "Foreign Language": ["Reading", "Translation Activity", "Homework", "Interview"],
    "Social Studies": ["Homework", "Reading", "Essay", "Presentation"]
  }
  // default class selection value, which prevents a user from being able to select an assignment type
  // until they enter a class type
  classSelected = 0;

  // instance variables for a new event (assignment) to be added
  event = new event();
  minDate = new Date().toISOString();
 
  // Constructor
  // the eventModalPage is created based on the selected day from the home page
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
 
  // Method: cancel
  // handles when a user dismisses the assignment creation page without entering any assignment 
  // details by rerouting the user to the home page 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  // Method: save
  // handles when the user adds a new assignment to be tracked by Homework Helper by dismissing
  // the EventModalPage and passing the assignment details to the home page to be saved to the database
  save() {
    this.viewCtrl.dismiss(this.event);
  }
 
}