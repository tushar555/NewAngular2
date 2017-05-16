import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {SignupPage} from '../signup/signup';
/*
  Generated class for the Loginselection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-loginselection',
  templateUrl: 'loginselection.html'
})
export class LoginselectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginselectionPage');
  }

 loginasRecruiter()
 {
    this.navCtrl.push(HomePage,{
      "is_employee":1
    });
 }

 loginasSeeker()
 {
    this.navCtrl.push(HomePage,{
      "is_employee":0
    });
 }

 Signup()
 {
   this.navCtrl.push(SignupPage);
 }

}
