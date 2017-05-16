import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,AlertController,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ShowProfilePage} from '../show-profile/show-profile';
import {MainHomePage} from '../main-home/main-home';
/*
  Generated class for the SearchProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-profile',
  templateUrl: 'search-profile.html'
})
export class SearchProfilePage {
   data: any;
  fetchdata:any;
  code:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public toastCtrl:ToastController,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
     this.data ={};
   this.fetchdata={};
   this.data.city="";
   this.data.experience="";
   this.data.profile="";



  }

  doRefresh(refresher) 
  {
  
   this.ionViewDidLoad();


    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
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
  let link = "http://animationcircle.com/AnimationCircle/search_profile.php";
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
  show_profile(email)
  {
    this.navCtrl.push(ShowProfilePage,{
      email:email
    });

  }
  mainhomepage()
  {
    this.navCtrl.setRoot(MainHomePage);
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
  let link = "http://animationcircle.com/AnimationCircle/search_profile.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
          this.fetchdata=data;
         console.log(data); 
    loading.dismiss();
    },error=>{console.log(error)});  
     
  });

  }
  onchnage(changecity)
  {
          let city=changecity;  
          let data=JSON.stringify({city});   
          //*****************  
          let link = "http://animationcircle.com/AnimationCircle/change_search_profile.php";
            this.http.post(link,data)
            .map(res=>res.json())
            .subscribe(data=>{
                  this.fetchdata=data;
                  this.code=data.message;
                console.log(data); 
    
    },error=>{console.log(error)});  
     
 
  }
}
