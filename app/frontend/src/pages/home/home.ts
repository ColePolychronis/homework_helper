import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { EventService } from './event.service';

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
        if(eventData.user == this.navParams.data["user"]){
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
        eventData["user"] = this.navParams.data["user"];
        this.eventServ.newEvent(eventData).subscribe((res => {
          let events = this.eventSource;
          events.push(eventData);
          this.eventSource = [];
          setTimeout(() => {
            this.eventSource = events;
          });
        }));
        


        // let eventData = data;
        
        // eventData.startTime = new Date(data.startTime);
        // // eventData.startTime = new Date(data.endTime);
        // eventData.endTime = new Date(data.endTime);
 
        // let events = this.eventSource;
        // events.push(eventData);
        // this.eventSource = [];
        // setTimeout(() => {
        //   this.eventSource = events;
        // });
      }
    });
  }
  test(){
    console.log("DId test HELP")
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
    // console.log(this.navParams.data["user"])
  }
 
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

}
