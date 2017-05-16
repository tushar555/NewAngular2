import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

/*
  Generated class for the Resume page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html'
})
export class ResumePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
