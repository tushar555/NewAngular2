import { Component } from '@angular/core';
import { NavController,ToastController,NavParams,MenuController,AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
/*
  Generated class for the ProfileSummary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-summary',
  templateUrl: 'profile-summary.html'
})
export class ProfileSummaryPage {

  data:any;
  uem:any;
  profile_summary:any;
  constructor(public http: Http,public storage: Storage,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public menu: MenuController) {
     this.data={}; 
     this.data.uem=navParams.get('email');
     this.data.profile_summary=navParams.get('profile_summary');

  }
   save(data)
  {
   // this.data.uem=data.uem;
    let loading = this.loadingCtrl.create({
    content: 'Saving details...'
  });

  loading.present();

  setTimeout(() => {
  let uem4=this.data.uem;
  let profile_summary2=this.data.profile_summary;  
  let data=JSON.stringify({uem4,profile_summary2});  
  let link = "http://animationcircle.com/AnimationCircle/update_employee_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
      if( data.res[0].code=='true')
      {
          let toast = this.toastCtrl.create({
          message: "Profile Summary Updated",
          duration: 3000
        });
        toast.present();
      }   
    loading.dismiss();
    },error=>{console.log(error)});     
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileSummaryPage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
