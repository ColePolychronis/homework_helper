import { Component } from '@angular/core';
import { NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginService } from '../login/login.service';
import { newCredential } from '../home/types';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  success: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginServ: LoginService, public alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(username: string, password: string): void{
    (this.loginServ.checkLogin(username, password)).subscribe(res => {
      this.success = res;
      this.handleLogin(username);
    });
  }

  handleLogin(username: string) {
    if(this.success){
      this.navCtrl.push(HomePage, {"user": username});
    }else{
      this.presentAlert();
    }
  }

  presentAlert() {
    let alert = this.alert.create({
      title: 'Incorrect Credentials',
      subTitle: 'You entered an incorrect username or password.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  addUser() {
    let params: newCredential = new newCredential();
    this.loginServ.newUser(params);
    let alert = this.alert.create({
      title: 'Confirmation',
      subTitle: 'You have been registered. U: ' + params['username'] + 'P: ' + params['password'],
      buttons: ['Okay']
    });
    alert.present();
  }

  

}
