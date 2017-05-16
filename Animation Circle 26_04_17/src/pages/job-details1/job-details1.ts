import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController,Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MainHomePage } from '../main-home/main-home';

/*
  Generated class for the JobDetails1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-job-details1',
  templateUrl: 'job-details1.html'
})
export class JobDetails1Page {

 
  profile:any;
  company:any;
  experienece: any;
  city:any;
  post_date:any;
  description:any;
  industry:any;
  key_skill:any;
  education:any;
  id:any;
   data: any;
   unm:any;
   uem:any;
   status:any;
  constructor(public storage: Storage,private platform: Platform,public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public toastCtrl:ToastController) {
    this.id=navParams.get('id');
    this.profile=navParams.get('profile');
    this.company=navParams.get('company'); 
    this.experienece=navParams.get('experienece');
    this.city=navParams.get('city');
    this.post_date=navParams.get('post_date');
    this.description=navParams.get('description');
    this.industry=navParams.get('industry');
    this.key_skill=navParams.get('key_skill');
    this.education=navParams.get('education');
    this.unm=navParams.get('unm');
    this.uem=navParams.get('uem');
  let loading = this.loadingCtrl.create({
   // spinner: 'show',
    content: 'Applying...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
    let id = this.id;  
     let uname = this.unm;
     let uemail = this.uem;
     console.log(this.unm);
     console.log(this.uem);
    let data=JSON.stringify({id,uname,uemail});
    let link = "http://animationcircle.com/AnimationCircle/job_application_insert.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
      console.log("Data",data);
      if(data.res[0].code=='false')
      {
         this.status=false;
          console.log(this.status);
          let toast = this.toastCtrl.create({
            message: "You have already applied to this job.",
            duration: 3000
          });
          toast.present();
      }else if(data.res[0].code=='true')
      {
         this.status=true;
          let toast = this.toastCtrl.create({
            message: "Applied Successfully.",
            duration: 3000
          });
          toast.present();
      }
 
    loading.dismiss(); 
     
      
    },error=>{console.log(error)}); 
     
  });
      

  
  }
  
mainhomepage()
{
  this.navCtrl.setRoot(MainHomePage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetails1Page');
  }

}
