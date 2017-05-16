import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
import {MyProfilePage} from '../my-profile/my-profile';
/*
  Generated class for the WorkExperiance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-work-experiance',
  templateUrl: 'work-experiance.html'
})
export class WorkExperiancePage {
  data:any;
  uem:any;
  designation:any;
  organization:any;
  start_date:any;
  end_date:any;
  profile_description:any;
  notice_period:any;
  is_current_company:any;

  constructor(public http: Http,public storage: Storage,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
      this.data={}; 
      this.uem=navParams.get('email');
      console.log("hiiiii"+this.data.uem);
      this.data.designation=""; 
      this.data.organization=""; 
      this.data.start_date="";
      this.data.end_date="";
      this.data.profile_description="";
      this.data.notice_period="";
      this.data.is_current_company=""
      
  }

  save()
  {
     let loading = this.loadingCtrl.create({
    content: 'Adding Details...'
  });

  loading.present();

  setTimeout(() => {
  let uem1=this.uem;
  let designation=this.data.designation; 
  let organization=this.data.organization; 
  let start_date=this.data.start_date;
  let end_date=this.data.end_date;
  let profile_description=this.data.profile_description;
  let notice_period=this.data.notice_period;
  let is_current_company=this.data.is_current_company;
  let data=JSON.stringify({uem1,designation,organization,start_date,end_date,profile_description,notice_period,is_current_company});  
  let link = "http://animationcircle.com/AnimationCircle/add_employment_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
          if(data.res[0].code=='true')
          {
               let toast = this.toastCtrl.create({
                message: "Details Added!",
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
    console.log('ionViewDidLoad WorkExperiancePage');
  }

}
