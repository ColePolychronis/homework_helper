import { Component, OnInit} from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { EventService } from './event.service';
// import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public navParams: NavParams, public eventServ: EventService) { }

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
          events.push(eventData);
        }
      }
      this.eventSource = []
      setTimeout(() => {
        this.eventSource = events;
      })
    });
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        // this.eventServ.
        let eventData = data;
        eventData.startTime = new Date(eventData.startTime);
        eventData.endTime = new Date(eventData.endTime);
        eventData.user = this.navParams.data["user"];
        eventData.timeCompletion = this.processTime(eventData.timeCompletion)
        console.log("Event")
        console.log(eventData)
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
                //temp
                if(this.navParams.data["user"] == "cole"){
                  eventData.predictedTime = 1.1*eventData.predictedTime; 
                }
                if(this.navParams.data["user"] == "jenny"){
                  eventData.predictedTime = 0.9*eventData.predictedTime; 
                }
                eventData.startTime = new Date(eventData.startTime);
                eventData.endTime = new Date(eventData.endTime);
                events.push(eventData);
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

  processTime(time){
    let colonInd = time.indexOf(":");
    let hours = Number(time.substring(0, colonInd));
    let mins = Number(time.substring(colonInd+1));
    hours = hours*60;
    return hours + mins;
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    let modal = this.modalCtrl.create('EventLogModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      // console.log(data)
      if(data){
        var completed = data[0];
        var timeSpent = data[1];
        event.completed = completed;
        event.timeSpent = this.processTime(String(timeSpent));
        // console.log(event)

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
                events.push(eventData);
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
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  neatDate(dt){
    console.log(dt)
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = dt.date;
    return day[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate();
  }

  neatTime(time){
    var hour = Math.floor(time /60);
    var min = Math.trunc(time % 60);
    return hour + " hrs " + min + " mins"
  }

  // logHours(){
  //   // var targets = this.eventSource;
  //   // console.log(targets)
  //   // var passed = [];
  //   // for (let t of targets){
  //   //   if (this.selectedDay.getTime() >= t.startTime.getTime() && this.selectedDay.getTime() <= t.endTime.getTime()){
  //   //     passed.push(t)
  //   //   }
  //   // }
  //   this.navCtrl.push(HoursLogPage, {'selectedDay': this.selectedDay, 'user': this.navParams['user']});
  // }

  dayTotalTime(calendarDay){
    let totalTime = 0
    for(let event of calendarDay){
      // console.log(event['endTime'].getDate()-event['startTime'].getDate() + 1)
      totalTime += (event['predictedTime']/(event['endTime'].getDate()-event['startTime'].getDate() + 1))
    }
    return totalTime 
  }
  

}
