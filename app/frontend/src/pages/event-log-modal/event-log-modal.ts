import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EventLogModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-log-modal',
  templateUrl: 'event-log-modal.html',
})
export class EventLogModalPage {
  markComplete: boolean = false;
  timeSpent: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventLogModalPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss([this.markComplete, this.timeSpent]);
  }

  completeAndSave() {
    this.markComplete = true;
    this.viewCtrl.dismiss([this.markComplete, this.timeSpent]);
  }

}
