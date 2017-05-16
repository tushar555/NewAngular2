import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController  } from 'ionic-angular';
import { JobDetailsPage } from '../job-details/job-details';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
/*
  Generated class for the PostAJob page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-a-job',
  templateUrl: 'post-a-job.html'
})
export class PostAJobPage {

  data: any;
  fetchdata:any;
  code:any;
  constructor(public storage:Storage, public navCtrl: NavController, public navParams: NavParams,
  public menu: MenuController,public http: Http,public toastCtrl:ToastController,public alertCtrl: AlertController,
  public loadingCtrl: LoadingController) {
   this.data ={};
   this.fetchdata={};
   this.data.city="";
   this.data.experience="";
   this.data.profile="";

   

  }
  
 
  search()
  {
    let city=this.data.city;
    let experience=this.data.experience;
    let profile=this.data.profile;
    let data=JSON.stringify({city,experience,profile});
    if(city=="" || experience=="" || profile=="")
    {
      let toast = this.toastCtrl.create({
      message: "Please any one filter type",
      duration: 3000
    });
    toast.present(); 

    }
    else{
         

  
  let loading = this.loadingCtrl.create({
   // spinner: 'show',
    content: 'Please Wait...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
  let link = "http://animationcircle.com/AnimationCircle/get_job.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
       console.log();
      if(data.res[0].message=='false')
      {
        let alert = this.alertCtrl.create({
      title: 'Sorry!! No Data Found',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            }
        }
      ]
    });
    alert.present();
   
      }
    else{
          this.fetchdata=data;
         console.log(data); 
    } 
        
    loading.dismiss();
    },error=>{console.log(error)});  
     
  });

    //********************** */
    


    }
  }

  doRefresh(refresher) 
  {
  
   this.ionViewDidLoad();


    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  ionViewDidLoad() {
   let data=JSON.stringify({});
    let loading = this.loadingCtrl.create({
   // spinner: 'show',
    content: 'Please Wait...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
  let link = "http://animationcircle.com/AnimationCircle/get_job.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
       console.log();
          this.fetchdata=data;
         console.log(data);   
    loading.dismiss();
    },error=>{console.log(error)});  
     
  });

  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }

  jobdetail(id)
  {
    this.navCtrl.push(JobDetailsPage,{
      id:id
    });
  }

   onchnage(changecity)
    {
        let city=changecity;  
        let data=JSON.stringify({city}); 
        
        let link = "http://animationcircle.com/AnimationCircle/change_get_job.php";
          this.http.post(link,data)
          .map(res=>res.json())
          .subscribe(data=>{
                this.fetchdata=data;
                this.code=data.message;
              console.log(data); 
          
          },error=>{console.log(error)});  

    }


}
