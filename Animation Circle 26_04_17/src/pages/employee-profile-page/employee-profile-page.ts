import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FileChooser,Transfer,File,FilePath} from 'ionic-native';
import {EditmyProfilePage} from '../editmy-profile/editmy-profile';
import {MainHomePage} from '../main-home/main-home';

/*
  Generated class for the EmployeeProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-employee-profile-page',
  templateUrl: 'employee-profile-page.html'
})
export class EmployeeProfilePagePage {
email:any;
fetchdata:any;
image:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:Http,public loadingCtrl:LoadingController) {
   this.fetchdata={};
  }
EditmyProfilePage(fetchdata)
{
 
  this.navCtrl.push(EditmyProfilePage,{fetchdata})
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
         this.storage.get("email").then((value)=>{
              this.email=value;
         let loading = this.loadingCtrl.create({
    content: 'Fetching details...'
  });

  loading.present();

  setTimeout(() => {
  let email=this.email;  
  let data=JSON.stringify({email});  
  let link = "http://animationcircle.com/AnimationCircle/fetch_employee_profile_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{

         this.fetchdata=data.res[0];
         if(this.fetchdata.profile_pic!="")
              this.image=this.fetchdata.profile_pic;
         else
              this.image="";     
         console.log(this.fetchdata);
         console.log(this.image);
    loading.dismiss();
    },error=>{console.log(error)});     
  });

    });
  }

   
  mainhomepage()
  {
    this.navCtrl.setRoot(MainHomePage);
  }

}
