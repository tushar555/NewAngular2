import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from "../home/home";
/*
  Generated class for the Forgotpassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotpasswordPage {

  constructor(public http: Http,public toastCtrl:ToastController,public storage:Storage, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  changeemail(email)
  {
    if(email==null)
    {
           let toast = this.toastCtrl.create({
                message: "Please enter Email",
                duration: 3000
              });
              toast.present(); 
    }else{

            let data=JSON.stringify({email});
            console.log(data);
            let link="http://animationcircle.com/AnimationCircle/sendemail.php";
            this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                 console.log(data);
                      if(data.res.code=='true')
                      {
                        let toast = this.toastCtrl.create({
                        message: "Please Check your Email",
                        duration: 3000
                      });
                      toast.present(); 

                      }
              });

    }    

  }
  returntohome(){
    this.navCtrl.push(HomePage);
  }

}
