import { Component } from '@angular/core';
import { NavController, NavParams,MenuController,ToastController,LoadingController,AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import {MainHomePage} from "../main-home/main-home";
import {Storage} from '@ionic/storage';
/*
  Generated class for the NewJob page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-job',
  templateUrl: 'new-job.html'
})
export class NewJobPage {
 jobPost : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController,
    private http : Http,public toastCtrl:ToastController,public loadingCtrl: LoadingController,public alertCtrl:AlertController,public storage:Storage) {
    this.jobPost = {};
    this.jobPost.name         = this.jobPost.name;
    this.jobPost.designation  = this.jobPost.designation;
    this.jobPost.location     = this.jobPost.location;
    this.jobPost.company_name = this.jobPost.company_name;
    this.jobPost.key_skill    = this.jobPost.key_skill;
    this.jobPost.education    = this.jobPost.education;
    this.jobPost.expFrom      = this.jobPost.expFrom;
    this.jobPost.expTo        = this.jobPost.expTo;
    // this.jobPost.salaryFrom   = this.jobPost.salaryFrom;
    // this.jobPost.salaryTo     = this.jobPost.salaryTo;
    this.jobPost.description  = this.jobPost.description; 
  }
postAJob(jobPost){

     if(jobPost.name==null||jobPost.designation==null||jobPost.location==null||jobPost.company_name==null||jobPost.key_skill==null||
     jobPost.education==null||jobPost.expFrom==null||jobPost.expTo==null||jobPost.description==null)
     {
              let toast = this.toastCtrl.create({
              message: "Please Fill out all Details",
              duration: 3000
            });
            toast.present(); 
     }else{
                  this.storage.get("email").then((value)=>{
                      let getData = {  name       : jobPost.name,        designation  : jobPost.designation,
                                  location   : jobPost.location,    company_name : jobPost.company_name,
                                  key_skill  : jobPost.key_skill,   education    : jobPost.education,
                                  expFrom    : jobPost.expFrom,     expTo        : jobPost.expTo,
                                  // salaryFrom : this.jobPost.salaryFrom,  salaryTo     : this.jobPost.salaryTo,
                                  description: jobPost.description,
                                  posted_by:value
                                };

                          let loading = this.loadingCtrl.create({
                        content: 'Posting Job...'
                });

                loading.present();

                setTimeout(() => {
                    this.http.post('http://animationcircle.com/AnimationCircle/post_job.php', getData)
                    .map(res => res.json())
                    .subscribe(data => {
                      //alert(data.res[0].code);
                        if(data.res[0].code=='true')
                        {
                            let alert = this.alertCtrl.create({
                            title: 'Posted Successfully..',
                            message: 'Do you want to Post New Job?',
                              buttons: [
                                {
                                  text: 'Go to Home',   
                                  handler: () => {
                                  this.navCtrl.push(MainHomePage);
                                  }
                                },
                                {
                                  text: 'Post Job',
                                  role: "cancel",
                                  handler: () => {
                                    this.reset();
                                  }
                                }
                              ]
                            });
                              alert.present(); 
                              loading.dismiss();
                        }
                        // loading.dismiss();  
                        // console.log('jobPost res', data);
                    });  
                
                  
                });
                  });
            }
  }

  reset()
  {
    this.jobPost = {};
    this.jobPost.name         = "";
    this.jobPost.designation  = "";
    this.jobPost.location     = "";
    this.jobPost.company_name = "";
    this.jobPost.key_skill    = "";
    this.jobPost.education    = "";
    this.jobPost.expFrom      = "";
    this.jobPost.expTo        = "";
    // this.jobPost.salaryFrom   = "";
    // this.jobPost.salaryTo     = "";
    this.jobPost.description  = ""; 
  }
  mainhomepage()
  {
    this.navCtrl.setRoot(MainHomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewJobPage');
  }

}
