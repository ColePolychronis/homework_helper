// ==========================================================================================================
// 
// Typescript class for the HomePage page
// 
// This typescript class serves as the central home page of the app, containing the calendar view and
// facilitating access to other parts of the app, such as the hour logging page and the assignment
// creation page
// 
// ========================================================================================================== 

// import relevant components and pages
import { Component, OnInit} from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { EventService } from './event.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  // list to store events to be displayed on the calendar
  eventSource = [];
  // instance variables to keep track of selected day and its title
  viewTitle: string;
  selectedDay = new Date();
  // set default parameters for Ionic calendar component  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  // Constructor
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public navParams: NavParams, public eventServ: EventService) { }

  // Method: ngOnInit
  // called when the HomePage component is first generated, this method calls the event service to get 
  // assignments and filter them by currently logged-in user. These events are then saved in eventSource
  ngOnInit(){
    // Pulls events from Database
    this.eventServ.getEvents().subscribe((res) => {
      let events = this.eventSource;
      for(let result in res){
        // fixes eventData to have Dates instead of strings
        let eventData = res[result];
        if(eventData.user == this.navParams.data["user"] && eventData.completed != 1){
          eventData.startTime = new Date(eventData.startTime);
          eventData.endTime = new Date(eventData.endTime);
          if(eventData.endTime > new Date()){
            events.push(eventData);
          } 
        }
      }
      this.eventSource = []
      setTimeout(() => {
        this.eventSource = events;
      })
    });
  }

  // Method: addEvent
  // called when the user wants to add a new assignment to be tracked by Homework Helper, this method pops
  // the EventModalPage to display to the user. If the user enters in sufficient data to create a new 
  // assignment, the modal will return the assignment data, which is then passed to the event service to 
  // post to the server. The event service is then called to update which events need to be displayed on
  // the calendar 
  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        eventData.startTime = new Date(eventData.startTime);
        eventData.endTime = new Date(eventData.endTime);
        eventData.user = this.navParams.data["user"];
        eventData.timeCompletion = this.processTime(eventData.timeCompletion)
        this.eventServ.newEvent(eventData).subscribe((res => {
          // Pulls events from Database
          this.eventServ.getEvents().subscribe((res) => {
            let events = this.eventSource;
            // have to clear event source before we append to it
            events = [];
            for(let result in res){
              // fixes eventData to have Dates instead of strings
              let eventData = res[result];
              if(eventData.user == this.navParams.data["user"] && eventData.completed != 1){
                eventData.startTime = new Date(eventData.startTime);
                eventData.endTime = new Date(eventData.endTime);
                if(eventData.endTime > new Date()){
                  events.push(eventData);
                }
              }
            }
            this.eventSource = []
            setTimeout(() => {
              this.eventSource = events;
            })
          });
        }));
      }
    });
  }

  // Method: processTime
  // accepts a date formatted time string as input and returns the time in minutes
  processTime(time){
    let colonInd = time.indexOf(":");
    let hours = Number(time.substring(0, colonInd));
    let mins = Number(time.substring(colonInd+1));
    hours = hours*60;
    return hours + mins;
  }

  // Method: onViewTitleChanged
  // when a new date is selected, changes the calendar view accordingly
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  // Method: onEventSelected
  // called when the user taps on an assignment in the list view underneath the calendar, this method
  // pops the EventLogModalPage to display to the user. If the user either logs time for the assignment
  // or marks the assignment as complete, the modal will return the completed boolean and timeSpent vars,
  // which are then used to update the event (assignment) and then passed to the event service to post the
  // update to the server
  onEventSelected(event) {
    let modal = this.modalCtrl.create('EventLogModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if(data){
        var completed = data[0];
        var timeSpent = data[1];
        event.completed = completed;
        event.timeSpent = this.processTime(String(timeSpent));

        this.eventServ.updateEvent(event).subscribe((res => {
          // Pulls events from Database
          this.eventServ.getEvents().subscribe((res) => {
            let events = this.eventSource;
            // have to clear event source before we append to it
            events = [];
            for(let result in res){
              // fixes eventData to have Dates instead of strings
              let eventData = res[result];
              if(eventData.user == this.navParams.data["user"] && eventData.completed != 1){
                eventData.startTime = new Date(eventData.startTime);
                eventData.endTime = new Date(eventData.endTime);
                if(eventData.endTime > new Date()){
                  events.push(eventData);
                }
              }
            }
            this.eventSource = []
            setTimeout(() => {
              this.eventSource = events;
            })
          });

        }));
      }
    });
  }
 
  // Method: onTimeSelected
  // called whenever the user touches a date on the calendar, this method updates the selected date
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  // Method: neatDate
  // accepts a date string as input and reformats it to a more human readable format to be displayed
  // in the calendar view
  neatDate(dt){
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = dt.date;
    return day[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate();
  }

  // Method: neatTime
  // accepts a value of minutes as inputs and reformats it to a more human readable format of minutes
  // and hours to be displayed on the assignment list
  neatTime(time){
    var hour = Math.floor(time /60);
    var min = Math.trunc(time % 60);
    if(time > 0){
      return hour + " hrs " + min + " mins"
    }else{
      return 0 + " hrs " + 0 + " mins"
    }
  }

  // Method: dayTotalTime
  // accepting a given day as input, the method returns the total amount of time that the model predicts
  // a user will need to set aside for homework on a given day
  dayTotalTime(calendarDay){
    let totalTime = 0
    for(let event of calendarDay){
      totalTime += (event['predictedTime']/(event['endTime'].getDate()-event['startTime'].getDate() + 1))
    }
    return totalTime 
  }
  

}
