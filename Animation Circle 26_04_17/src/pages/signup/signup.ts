import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import {LoadingController,AlertController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {Storage} from '@ionic/storage';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

 data: any;
 val:any;
  constructor(public alertCtrl: AlertController, public storage: Storage,public navCtrl: NavController, public navParams: NavParams,public http: Http,public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
    this.data={};
    this.data.name="";
    this.data.mobile="";
    this.data.email="";
    this.data.password="";
    this.data.re_password="";
    this.data.is_employee="";
    this.val="";
     this.storage.get('is_employer').then((value) => {
                this.val=value;         

     });
  }

 reset()
 {  
    this.data={};
    this.data.name="";
    this.data.mobile="";
    this.data.email="";
    this.data.password="";
    this.data.re_password="";
    this.data.is_employee="";
 }


 signup()
 {
   this.storage.get("is_employer").then((value)=>{
    let name=this.data.name;
    let mobile=this.data.mobile;
    let email=this.data.email;
    let password=this.data.password;
    let is_employee=value;
    let re_password=this.data.re_password;
    let data=JSON.stringify({name,mobile,email,password,is_employee});
    console.log("signup Data",data);
    if(mobile=="" || email=="" || password=="")
    {
      console.log("mobile",mobile);
      console.log("email",email);
      console.log("password",password);
      let toast = this.toastCtrl.create({
      message: "Please Fill out all Details",
      duration: 3000
    });
    toast.present(); 

    }else if(password!=re_password){
          let toast = this.toastCtrl.create({
          message: "Password Mismatch",
          duration: 3000
        });
        toast.present();
    }
    else{

  
  let loading = this.loadingCtrl.create({
   // spinner: 'show',
    content: 'Signing up...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
  let link = "http://animationcircle.com/AnimationCircle/signup.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
      
                let alert = this.alertCtrl.create({
                  title: 'Signup Successfully!',
                  subTitle:'Check Spam/Inbox of your mail to verify',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.push(HomePage,{value});
                      }
                    }
                  ]
                });
                alert.present();
                this.reset();
                loading.dismiss(); 
                },error=>{console.log(error)});     
  });

    
    }
   });

 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
