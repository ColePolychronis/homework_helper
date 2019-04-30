// ==========================================================================================================
// 
// Typescript class for the CredentialModalPage page
// 
// This typescript class serves as the pop-up page for Signing up a new user.
// 
// ========================================================================================================== 

// import relevant components and pages
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-credential-modal',
  templateUrl: 'credential-modal.html',
})
export class CredentialModalPage {
  // username and password instance variables
  usernameSU: '';
  passwordSU: '';

  // Constructor
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  // Method: cancelSU
  // handles when the user dismisses the Sign Up page without entering new credentials
  // and returns to login page
  cancelSU() {
    this.viewCtrl.dismiss();
  }

  // Method: saveSU
  // handles when a user successfully adds new credentials to the system, by dismissing the
  // modal page and passing the user's selected username and password to the login page to be
  // saved to the database
  saveSU() {
    this.viewCtrl.dismiss([this.usernameSU, this.passwordSU]);
  }

}
