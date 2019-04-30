// ==========================================================================================================
// 
// Typescript class for the EventLogModalPage page
// 
// This typescript class serves as the pop-up page that allows users to log hours spent on an assignment
// or to mark an assignment as complete
// 
// ========================================================================================================== 

// import relevant components and pages
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-log-modal',
  templateUrl: 'event-log-modal.html',
})
export class EventLogModalPage {
  // instance variables for marking assignment as complete or for logging hours
  markComplete: boolean = false;
  timeSpent: number = 0;

  // Constructor
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  // Method: cancel
  // handles when the user dismisses the Hour Logging Page without logging hours or
  // marking an assignment as complete by rerouting the user to the home page 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  // Method: save
  // handles when the user logs hours spent on an assignment by dismissing the modal 
  // page and passing the amount of time that the user spent on the assignment to the
  // home page to be saved to the database 
  save() {
    this.viewCtrl.dismiss([this.markComplete, this.timeSpent]);
  }

  // Method: completeAndSave
  // handles when the user marks an assignment as complete by dismissing the modal page, 
  // marking complete as true, and passing the completed boolean to the home page to be 
  // saved to the database
  completeAndSave() {
    this.markComplete = true;
    this.viewCtrl.dismiss([this.markComplete, this.timeSpent]);
  }

}
