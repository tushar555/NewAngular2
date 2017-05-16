import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {MyProfilePage} from '../my-profile/my-profile';
/*
  Generated class for the ITSkill page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-it-skill',
  templateUrl: 'it-skill.html'
})
export class ITSkillPage {
   data:any;
   skill:any;
   version:any;
   last_used:any;
   total_exp_yr:any;
   total_exp_month:any;
   constructor(public storage: Storage,public navCtrl: NavController, public menu: MenuController,public http: Http,public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
     this.data={};
     this.skill="";
     this.version="";
     this.last_used="";
     this.total_exp_yr="";
     this.total_exp_month="";
   }

 save()
  {
    this.storage.get('email').then((value) => {
    let email=value
    let skill=this.data.skill;
    // let version=this.data.version;
    // let last_used=this.data.last_used;
    // let total_exp_yr=this.data.total_exp_yr;
    // let total_exp_month=this.data.total_exp_month;
    let data=JSON.stringify({email,skill});
    if(skill=="")
    {
      let toast = this.toastCtrl.create({
      message: "Enter atleast one link",
      duration: 3000
    });
    toast.present(); 

    }
    else{  
           let loading = this.loadingCtrl.create({
           content: 'Adding Links...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
  let link = "http://animationcircle.com/AnimationCircle/addshowrill.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
     if(data.res[0].code=='true')
     {
          let toast = this.toastCtrl.create({
          message: "Links Added Successfully!!",
          duration: 3000
        });
        toast.present(); 
        loading.dismiss();
        this.navCtrl.push(MyProfilePage);
     }else{
        let toast = this.toastCtrl.create({
          message: "Can't Add Project!!",
          duration: 3000
        });
        toast.present(); 
        loading.dismiss();
     }      
    },error=>{console.log(error)}); 
     
  });   
    }
  });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ITSkillPage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
