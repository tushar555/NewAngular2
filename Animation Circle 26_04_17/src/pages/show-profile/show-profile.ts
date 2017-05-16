import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {SpecificChatPage} from '../specific-chat/specific-chat';
import {Storage} from '@ionic/storage';
import { Transfer } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainHomePage} from '../main-home/main-home';
declare var cordova: any;

/*
  Generated class for the ShowProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-profile',
  templateUrl: 'show-profile.html'
})
export class ShowProfilePage {
  email:any;
  fetchdata:any;
  skills:any;
  data1:any;
  resume_name:any;
  key_skill:Array<{key_skill: string}>;
  employment_details:Array<{designation:string,organization:string,start_date:string,end_date:string,profile_description:string}>;
  Projects:Array<{projects:string,pr_start_date:string,pr_end_date:string,pr_details:string}>;
  it_skill:Array<{it_skill: string}>;
  certifications:Array<{certifications: string}>; 
  languages:Array<{lang: string,proficiency:string}>;
  education:Array<{education: string,university:string,passout:string}>;
  employment:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public alertCtrl:AlertController,public http:Http,public loadingCtrl:LoadingController) {
    this.fetchdata={}; 
    
    this.data1={};
    this.resume_name={};
    this.email=navParams.get("email");
   console.log(this.email);
        let loading = this.loadingCtrl.create({
    content: 'Fetching details...'
  });

  loading.present();

  setTimeout(() => {
  let email=this.email;  
  let data=JSON.stringify({email});  
  let link = "http://animationcircle.com/AnimationCircle/fetch_specific_employee_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
          this.fetchdata=data.res[0];
          this.skills=data.skill[0];
          this.key_skill=data.key_skill; 
          this.employment=data.employment_details;
          this.Projects=data.Projects;
          this.it_skill=data.it_skill;
          this.education=data.education;
         
          this.languages=data.languages;
          this.certifications=data.certifications;
    loading.dismiss();
    },error=>{console.log(error)});     
  });

  }

 mainhomepage()
 {
   this.navCtrl.setRoot(MainHomePage);
 }
  go_to_chat()
  {
    this.storage.get("email").then((value)=>{
      this.navCtrl.push(SpecificChatPage,{
        opponent_email :this.email,
        my_email:value
      });
    });
    
  }

download(email) {
    
  let email12=email;  
  let data=JSON.stringify({email12});  
  let link = "http://animationcircle.com/AnimationCircle/resume_name.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
      
       let loading = this.loadingCtrl.create({
       content: 'Downloading...'
      });

        loading.present();

  setTimeout(() => {
                let email=this.email;  
                let data=JSON.stringify({email});  
                let link = "http://animationcircle.com/AnimationCircle/fetch_specific_employee_details.php";
                  this.http.post(link,data)
                  .map(res=>res.json())
                  .subscribe(data=>{
                                    var newFileName = data.res[0].resume_link;
                                    const fileTransfer = new Transfer();
                                    let url = 'http://animationcircle.com/AnimationCircle/resume/'+newFileName;
                                    fileTransfer.download(url, cordova.file.externalRootDirectory  + newFileName).then((entry) => {
                                      console.log('download complete: ' + entry.toURL());
                                      var showurl=entry.toURL();
                                      let alert = this.alertCtrl.create({
                                        title: 'File Downloaded Successfully',
                                        subTitle: 'Find file on '+showurl,
                                        buttons: ['OK']
                                      });
                                      alert.present();

                                    }, (err) => {
                                      let alert = this.alertCtrl.create({
                                        title: 'Alert!!',
                                        subTitle: 'User has not uploaded resume!!',
                                        buttons: ['OK']
                                      });
                                    alert.present();
                                    })   
                                  loading.dismiss();
                               },error=>{console.log(error)});     
                  });
         },error=>{console.log(error)});
	  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowProfilePage');
  }

}
