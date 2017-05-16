import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {MyProfilePage} from '../my-profile/my-profile';
/*
  Generated class for the Project page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {
  email:any;
  data: any;
  client_name:any;
  start_date:any;
  end_date;any;
  project_details:any;
  project_name:any; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
    this.data={};
    this.client_name="";
    this.start_date="";
    this.end_date="";
    this.project_details="";
    this.project_name="";
    this.email=navParams.get('email');
  }
  save()
  {
    let email=this.email;
    let client_name=this.data.client_name;
    let start_date=this.data.start_date;
    let end_date=this.data.end_date;
    let project_details=this.data.project_details;
    let project_name=this.data.project_name;
    let data=JSON.stringify({email,client_name,start_date,end_date,project_details,project_name});
    if(client_name=="" || start_date=="" || end_date=="" || project_details=="" || project_name=="" )
    {
      let toast = this.toastCtrl.create({
      message: "Please Fill out all Details",
      duration: 3000
    });
    toast.present(); 

    }
    else{  
           let loading = this.loadingCtrl.create({
           content: 'Adding Project Details...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
  let link = "http://animationcircle.com/AnimationCircle/add_project.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
     if(data.res[0].code=='true')
     {
          let toast = this.toastCtrl.create({
          message: "Project Added Successfully!!",
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }

}
