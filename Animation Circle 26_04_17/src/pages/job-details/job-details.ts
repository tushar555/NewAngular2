import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JobDetails1Page } from '../job-details1/job-details1';
import { MenuController  } from 'ionic-angular';
import { ChatscreenPage } from '../chatscreen/chatscreen';
import {AlertController} from 'ionic-angular';
import {Http} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {MainHomePage} from '../main-home/main-home';
import {SpecificChatPage} from '../specific-chat/specific-chat';
//import {PostAJobPage} from '../post-a-job/post-a-job';
/*
  Generated class for the JobDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html'
})
export class JobDetailsPage {
  id:any;
  data:any;
  fetchdata:any;
  unm:any;
  uem:any;
  posted_by:any;
  constructor(public storage: Storage,public navCtrl: NavController, public navParams: NavParams,public menu: MenuController,public http: Http,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
   this.id=navParams.get('id');
   this.data={};
   this.fetchdata={};
  
     let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });

  loading.present();

  setTimeout(() => {
  //*****************
  let id=this.id;
  let data=JSON.stringify({id});  
  let link = "http://animationcircle.com/AnimationCircle/get_single_job.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
         this.fetchdata=data.res[0]; 
        console.log(data);   
    loading.dismiss();
    },error=>{console.log(error)});     
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailsPage');
  }
 ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }

  jobdetail1(profile,company,experience,city,post_date,description,industry,key_skill,education,id)
  {
    //this.navCtrl.push(JobDetails1Page);
    this.storage.get('name').then((value) => {
    this.unm=value;
   
  });
  this.storage.get('email').then((value) => {
    this.uem=value;
   
  });
  let alert = this.alertCtrl.create({
    title: 'Apply Confirmation',
    message: 'Do you want to apply to job?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {      
          }
      },
      {
        text: 'Apply',
        handler: () => {
          this.navCtrl.setRoot(JobDetails1Page,{
              profile:profile,
              company:company,
              experience:experience,
              city:city,
              post_date:post_date,
              description:description,
              industry:industry,
              key_skill:key_skill,
              education:education,
              id:id, 
              unm:this.unm,
              uem:this.uem
          });
        }
      }
    ]
  });
  alert.present();

  }
  mainhomepage()
  {
    this.navCtrl.setRoot(MainHomePage);
  }
   go_to_chat(posted_by,name)
  {
 console.log("opponent_email: "+posted_by);

    this.storage.get("email").then((value)=>{
      this.navCtrl.push(SpecificChatPage,{
        opponent_email :posted_by,
        my_email:value,
        withname :name
      });
    });
    
  }
}
