// ==========================================================================================================
// 
// Typescript class for the LoginPage page
// 
// This typescript class serves as the central home page of the app, containing the calendar view and
// facilitating access to other parts of the app, such as the hour logging page and the assignment
// creation page
// 
// ========================================================================================================== 

// import relevant components and pages
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Alert, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginService } from '../login/login.service';
import { newCredential } from '../home/types';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // instance variable to track whether a user has successfully logged in
  success: boolean = false;

  // Constructor
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginServ: LoginService, public alert: AlertController, public modalCtrl: ModalController) {
  }

  // Method: login
  // accepts a username and password as input, this method passes username and password to the login
  // service and then passes the result of the services checkLogin call to the handleLogin method
  login(username: string, password: string): void{
    (this.loginServ.checkLogin(username, password)).subscribe(res => {
      this.success = res;
      this.handleLogin(username);
    });
  }

  // Method: handleLogin
  // accepts a username as input, and based on if the user exists in the database according to the
  // login service, will automatically navigate the user to the home page if they logged in successfully
  // and will presentAlert to the user if they did not log in successfully
  handleLogin(username: string) {
    if(this.success){
      this.navCtrl.push(HomePage, {"user": username});
    }else{
      this.presentAlert();
    }
  }

  // Method: presentAlert
  // displays a pop up message to the user that either their username or password was incorrect
  presentAlert() {
    let alert = this.alert.create({
      title: 'Incorrect Credentials',
      subTitle: 'You entered an incorrect username or password.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  // Method: addUser
  // called when the user wants to sign up for a Homework Helper account, this message pops the 
  // CredentialModalPage to display to the user. If the user enters in a unique username and password
  // the modal will return the username and password, which is then passed to the login service to 
  // post to the server
  addUser() {
    let modal = this.modalCtrl.create('CredentialModalPage');
    modal.present()
    modal.onDidDismiss(data =>{
      if(data){
        let newUser = new newCredential;
        newUser.username = data[0];
        newUser.password = data[1];
        this.loginServ.newUser(newUser);
      }
    });
  }

  

}
