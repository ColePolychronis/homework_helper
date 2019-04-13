import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CredentialModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credential-modal',
  templateUrl: 'credential-modal.html',
})
export class CredentialModalPage {

  usernameSU: '';
  passwordSU: '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CredentialModalPage');
  }

  cancelSU() {
    this.viewCtrl.dismiss();
  }

  saveSU() {
    console.log(this.usernameSU)
    this.viewCtrl.dismiss([this.usernameSU, this.passwordSU]);
  }

}
