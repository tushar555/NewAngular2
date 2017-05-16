import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {FeedbackPage} from '../feedback/feedback';
import {PolicyPage} from '../policy/policy';
/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
 goto() {

        this.navCtrl.push(FeedbackPage);
    
  }
  goto1()
  {
        this.navCtrl.push(PolicyPage);
  }
}
