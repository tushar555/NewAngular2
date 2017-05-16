import { Component } from '@angular/core';
import { NavController, MenuController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
import {LoadingController,AlertController,ToastController} from 'ionic-angular';
import {MyProfilePage} from '../my-profile/my-profile';
/*
  Generated class for the Editpersonaldetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editpersonaldetails',
  templateUrl: 'editpersonaldetails.html'
})
export class EditpersonaldetailsPage {
  data:any;
  constructor(public http: Http,public storage: Storage,public toastCtrl:ToastController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public navCtrl: NavController, public menu: MenuController) {
    this.data=navParams.get("fetchdata");  
  }

  save(data1)
  {
    let loading = this.loadingCtrl.create({
    content: 'Saving details...'
  });

  loading.present();

  setTimeout(() => {
  let email=data1.email;
  let dob=data1.dob;
  let gender=data1.gender;
  let home_town=data1.home_town;
  let pincode=data1.pincode;
  let marital_status=data1.marital_status;
  let permanent_add=data1.permanent_add;
   
  let data=JSON.stringify({email,dob,gender,home_town,pincode,marital_status,permanent_add});  
  let link = "http://animationcircle.com/AnimationCircle/update_employee_personal_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
      if( data.res[0].code=='true')
      {
          let toast = this.toastCtrl.create({
          message: "Details Updated",
          duration: 3000
        });
        toast.present();
      }  

    loading.dismiss();
     this.navCtrl.push(MyProfilePage);
    },error=>{console.log(error)});     
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpersonaldetailsPage');
  }

}
