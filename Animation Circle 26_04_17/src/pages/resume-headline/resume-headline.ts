import { Component } from '@angular/core';
import { NavController,NavParams, MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
import {LoadingController,AlertController,ToastController} from 'ionic-angular';

/*
  Generated class for the ResumeHeadline page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resume-headline',
  templateUrl: 'resume-headline.html'
})
export class ResumeHeadlinePage {

  data:any;
  uem:any;
  resume_headline:any;
 constructor(public http: Http, public navParams: NavParams,public storage: Storage,public toastCtrl:ToastController,public navCtrl: NavController, public menu: MenuController,public loadingCtrl: LoadingController) {
     this.data={}; 
     this.data.uem=navParams.get('email');
     this.data.resume_headline=navParams.get('resume_headline');
 }

 save(data)
  {
   // this.data.uem=data.uem;
    let loading = this.loadingCtrl.create({
    content: 'Saving details...'
  });

  loading.present();

  setTimeout(() => {
  let uem3=this.data.uem;
  let resume_headline2=this.data.resume_headline;  
  let data=JSON.stringify({uem3,resume_headline2});  
  let link = "http://animationcircle.com/AnimationCircle/update_employee_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
      if( data.res[0].code=='true')
      {
          let toast = this.toastCtrl.create({
          message: "Resume Headline Updated",
          duration: 3000
        });
        toast.present();
      }   
    loading.dismiss();
    },error=>{console.log(error)});     
  });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumeHeadlinePage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
