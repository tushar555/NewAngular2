import { Component } from '@angular/core';
import { NavController, NavParams,MenuController,ToastController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MyProfilePage} from '../my-profile/my-profile';
/*
  Generated class for the AddEducation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-education',
  templateUrl: 'add-education.html'
})
export class AddEducationPage {
email:any;
data:any;
//Full_Time:any;
//Part_Time:any;
//Distance:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController,public http: Http,public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
    this.email=navParams.get("email");
    this.data={};
  }

 save()
  {
 
    let email=this.email;
    let education=this.data.education;
    let course=this.data.course;
    let specialization=this.data.specialization;
    let university=this.data.university;
    let passout=this.data.passout;
    let time=this.data.time;
    
    let data=JSON.stringify({email,education,course,specialization,university,passout,time});
    console.log(data);
    if(education=="" || course=="" || specialization=="" || university=="" || passout=="" )
    {
      let toast = this.toastCtrl.create({
      message: "Please Fill out all Details",
      duration: 3000
    });
    toast.present(); 

    }
    else{  
           let loading = this.loadingCtrl.create({
           content: 'Adding Education Details...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
  let link = "http://animationcircle.com/AnimationCircle/add_education.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
     if(data.res[0].code=='true')
     {
          let toast = this.toastCtrl.create({
          message: "Education Details Added Successfully!!",
          duration: 3000
        });
        toast.present(); 
        loading.dismiss();
        this.navCtrl.push(MyProfilePage);
     }else{
        let toast = this.toastCtrl.create({
          message: "Can't Add!!",
          duration: 3000
        });
        toast.present(); 
        loading.dismiss();
     }      
    },error=>{console.log(error)}); 
     
  });   
    }
 
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEducationPage');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
