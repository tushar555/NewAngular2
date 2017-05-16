import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
import {LoadingController,AlertController,ToastController} from 'ionic-angular';
import {MyProfilePage} from '../my-profile/my-profile';
/*
  Generated class for the ContactDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html'
})
export class ContactDetailsPage {

  data:any;
  uem:any;
  mobile:any;
  constructor(public http: Http,public storage: Storage,public toastCtrl:ToastController, public navParams: NavParams,public alertCtrl: AlertController,public navCtrl: NavController, public menu: MenuController,public loadingCtrl: LoadingController) {
    this.data={}; 
     this.data.uem=navParams.get('email');
     this.data.mobile=navParams.get('mobile');
  }

  save(data)
  {
   // this.data.uem=data.uem;
    let loading = this.loadingCtrl.create({
    content: 'Saving details...'
  });

  loading.present();

  setTimeout(() => {
  let uem2=this.data.uem;
  let mobile2=this.data.mobile;  
  let data=JSON.stringify({uem2,mobile2});  
  let link = "http://animationcircle.com/AnimationCircle/update_employee_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
      if( data.res[0].code=='true')
      {
          let toast = this.toastCtrl.create({
          message: "Contact details Updated",
          duration: 3000
        });
        toast.present();
      } 
    loading.dismiss();
     this.navCtrl.push(MyProfilePage);
    },error=>{console.log(error)});     
  });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailsPage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
