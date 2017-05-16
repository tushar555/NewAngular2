import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { EditBasicDetailPage } from '../edit-basic-detail/edit-basic-detail';
import { ContactDetailsPage } from '../contact-details/contact-details';
import { ResumeHeadlinePage } from '../resume-headline/resume-headline';
import { ProfileSummaryPage } from '../profile-summary/profile-summary';
import { KeySkillPage } from '../key-skill/key-skill';
import { WorkExperiancePage } from '../work-experiance/work-experiance';
import { ProjectPage } from '../project/project';
import { ITSkillPage } from '../it-skill/it-skill';
import { AddEducationPage } from '../add-education/add-education';
import { CertificationsPage } from '../certifications/certifications';
import { WorkDetailsPage } from '../work-details/work-details';
import { OtherDetailsPage } from '../other-details/other-details';
import { MainHomePage } from '../main-home/main-home';
import { WorkExperiance1Page } from '../work-experiance1/work-experiance1';
import {EditpersonaldetailsPage} from '../editpersonaldetails/editpersonaldetails';
import {AddlanguagePage} from '../addlanguage/addlanguage';
import { ResumePage } from '../resume/resume';
import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FileChooser} from 'ionic-native';
import { Transfer } from 'ionic-native';
import {LoadingController,AlertController,ToastController} from 'ionic-angular';
import {ResumeuploadPage} from '../resumeupload/resumeupload';
import {SeekerHomePage} from '../seeker-home/seeker-home';

declare var cordova: any;
/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {
uem:any;
fetchdata:any;
email:any;
code:any;
// work_details:Array<{role:string,functional_area:string,industry:string,job_preference:string,desired_employment_type:string,preferred_location:string,available_join:string,work_authorization:string}>
 work_exp:Array<{designation: string, organization: string,is_current_company:string,start_date:string,end_date:string,profile_description:string,notice_period:string}>;
  project_name:Array<{projects: string}>;
  skill:Array<{skill: string}>;

  languages:Array<{lang: string,proficiency:string}>;
  key_skill:Array<{key_skill: string}>;
  education:Array<{education: string,university:string,passout:string,specialization:string,time:string}>;
  certificate:Array<{certifications:string}>;
  constructor(public platform:Platform,public toastCtrl:ToastController,public http: Http,public storage: Storage,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
     this.code="";
    this.fetchdata={};
   
    //this.work_exp={};
   this.email=this.navParams.get("email");

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
     this.storage.get('email').then((value) => {
      this.uem=value;
      console.log("Profile Email",value);
    //  console.log("iiiIIIIII"+this.uem);
 let loading = this.loadingCtrl.create({
    content: 'Fetching details...'
  });

  loading.present();

  setTimeout(() => {
  let uem=this.uem;  
  let data=JSON.stringify({uem});  
  let link = "http://animationcircle.com/AnimationCircle/fetch_employee_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
         this.fetchdata=data.res[0];
         this.work_exp=data.work_experience;
         this.project_name=data.employment_details;
         this.skill=data.skill;
         this.education=data.res; 
        //  if(data.lang[0].present=='yes')
        //  {
        //    
        //  } 
        this.languages=data.lang;
         this.certificate=data.certifications;
         this.key_skill=data.key_skill;
        
         console.log(data);
    loading.dismiss();
    },error=>{console.log(error)});     
  });

  });
  }

 openurl(url)
 {
   this.platform.ready().then(()=>{
       cordova.InAppBrowser.open(url, "_system", "location=true");
   });
   
 }


  editBasicDetail(email,name,current_designation,current_location,total_experience,current_salary,total_experience_month)
  {
    this.navCtrl.push(EditBasicDetailPage,{
      email:email,
      name:name,
      current_designation:current_designation,
      current_location:current_location,
      total_experience:total_experience,
      current_salary:current_salary,
      total_experience_month:total_experience_month
    });
  }
  contactDetails(email,mobile)
  {
   
    this.navCtrl.push(ContactDetailsPage,{
      email:email,
      mobile:mobile
    });
  }
  resumeHeadline(email,resume_headline)
  {
    this.navCtrl.push(ResumeHeadlinePage,{
      email:email,
      resume_headline:resume_headline
    });
  }
  profileSummary(email,profile_summary)
  {
    this.navCtrl.push(ProfileSummaryPage,{
      email:email,
      profile_summary:profile_summary
    });
  } 
  personaldetails(fetchdata)
  {
   console.log(fetchdata);
      this.navCtrl.push(EditpersonaldetailsPage,{
        fetchdata:fetchdata
      })
  }
  deletekeyskill(skill,email)
  {
    console.log(skill,email);
                  let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete Detail?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  
                }
              },
              {
                text: 'Delete',
                handler: () => {
                          let loading = this.loadingCtrl.create({
            content: 'Deleting detail...'
          });

          loading.present();

          setTimeout(() => {
          let delskill=skill;
          let delemail=email;  
          let data=JSON.stringify({delskill,delemail});  
          let link = "http://animationcircle.com/AnimationCircle/delete.php";
            this.http.post(link,data)
            .map(res=>res.json())
            .subscribe(data=>{
                this.code=data.res[0].code;
                console.log(this.code);
                if(this.code=='true')
                {
                    let toast = this.toastCtrl.create({
                      message: 'Deleted Sucessfully',
                      duration: 3000,
                      position: 'top'
                    });
                      this.ionViewDidLoad();
                    toast.present();
                }
                
            loading.dismiss();
            },error=>{console.log(error)});     
          });

                }
              }
            ]
          });
          alert.present();
  }
  keySkill(email)
  {
    this.navCtrl.push(KeySkillPage,{
      email:email
    });
  }
  workExperiance(email)
  {
  
    this.navCtrl.push(WorkExperiancePage,{
      email:email
    });
  }
  Project(email)
  {
    this.navCtrl.push(ProjectPage,{
      email:email
    });
  }

  deleteproject(project,email)
  {
          let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete Detail?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  
                }
              },
              {
                text: 'Delete',
                handler: () => {
                          let loading = this.loadingCtrl.create({
            content: 'Deleting detail...'
          });

          loading.present();

          setTimeout(() => {
          let delproject=project;
          let delemail=email;  
          let data=JSON.stringify({delproject,delemail});  
          let link = "http://animationcircle.com/AnimationCircle/delete.php";
            this.http.post(link,data)
            .map(res=>res.json())
            .subscribe(data=>{
                this.code=data.res[0].code;
                console.log(this.code);
                if(this.code=='true')
                {
                    let toast = this.toastCtrl.create({
                      message: 'Deleted Sucessfully',
                      duration: 3000,
                      position: 'top'
                    });
                      this.ionViewDidLoad();
                    toast.present();
                }
                
            loading.dismiss();
            },error=>{console.log(error)});     
          });

                }
              }
            ]
          });
          alert.present();
  }


  ITSkill(email)
  {
    this.navCtrl.push(ITSkillPage,{
      email:email
    });
  }
  deleteshowreel(showreel,email)
  {
       let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete Detail?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  
                }
              },
              {
                text: 'Delete',
                handler: () => {
                          let loading = this.loadingCtrl.create({
            content: 'Deleting detail...'
          });

          loading.present();

          setTimeout(() => {
          let delshowreel=showreel;
          let delemail=email;  
          let data=JSON.stringify({delshowreel,delemail});  
          let link = "http://animationcircle.com/AnimationCircle/delete.php";
            this.http.post(link,data)
            .map(res=>res.json())
            .subscribe(data=>{
                this.code=data.res[0].code;
                console.log(this.code);
                if(this.code=='true')
                {
                    let toast = this.toastCtrl.create({
                      message: 'Deleted Sucessfully',
                      duration: 3000,
                      position: 'top'
                    });
                      this.ionViewDidLoad();
                    toast.present();
                }
                
            loading.dismiss();
            },error=>{console.log(error)});     
          });

                }
              }
            ]
          });
          alert.present();
  }
  addEducation(email)
  {
    this.navCtrl.push(AddEducationPage,{
      email:email
    });
  }
  deleteeducation(education,email)
  { 
           let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete Detail?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  
                }
              },
              {
                text: 'Delete',
                handler: () => {
                          let loading = this.loadingCtrl.create({
            content: 'Deleting detail...'
          });

          loading.present();

          setTimeout(() => {
          let deleducation=education;
          let delemail=email;  
          let data=JSON.stringify({deleducation,delemail});  
          let link = "http://animationcircle.com/AnimationCircle/delete.php";
            this.http.post(link,data)
            .map(res=>res.json())
            .subscribe(data=>{
                this.code=data.res[0].code;
                console.log(this.code);
                if(this.code=='true')
                {
                    let toast = this.toastCtrl.create({
                      message: 'Deleted Sucessfully',
                      duration: 3000,
                      position: 'top'
                    });
                      this.ionViewDidLoad();
                    toast.present();
                }
                
            loading.dismiss();
            },error=>{console.log(error)});     
          });

                }
              }
            ]
          });
          alert.present();

  }
  certifications(email)
  {
    this.navCtrl.push(CertificationsPage,{
      email:email
    });
  }
 
 deletecertificate(certificate,email)
 {
               let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete Detail?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  
                }
              },
              {
                text: 'Delete',
                handler: () => {
                          let loading = this.loadingCtrl.create({
            content: 'Deleting detail...'
          });

          loading.present();

          setTimeout(() => {
          let delcertificate=certificate;
          let delemail=email;  
          let data=JSON.stringify({delcertificate,delemail});  
          let link = "http://animationcircle.com/AnimationCircle/delete.php";
            this.http.post(link,data)
            .map(res=>res.json())
            .subscribe(data=>{
                this.code=data.res[0].code;
                console.log(this.code);
                if(this.code=='true')
                {
                    let toast = this.toastCtrl.create({
                      message: 'Deleted Sucessfully',
                      duration: 3000,
                      position: 'top'
                    });
                      this.ionViewDidLoad();
                    toast.present();
                }
                
            loading.dismiss();
            },error=>{console.log(error)});     
          });

                }
              }
            ]
          });
          alert.present();

 }
  otherDetails()
  {
    this.navCtrl.push(OtherDetailsPage);
  }

 mainhomepage()
  {
    this.navCtrl.push(SeekerHomePage);
  }
   workexperiancepage()
  {
    this.navCtrl.push(WorkExperiance1Page);
  }

  addlanguage(email)
  {
    this.navCtrl.push(OtherDetailsPage,{
      email:email
    });
  }

deletelanguage(language,email)
{
     let alert = this.alertCtrl.create({
    title: 'Confirm Delete',
    message: 'Do you want to delete Detail?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          
        }
      },
      {
        text: 'Delete',
        handler: () => {
                   let loading = this.loadingCtrl.create({
    content: 'Deleting detail...'
  });

  loading.present();

  setTimeout(() => {
  let dellanguage=language;
  let delemail=email;  
  let data=JSON.stringify({dellanguage,delemail});  
  let link = "http://animationcircle.com/AnimationCircle/delete.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
         this.code=data.res[0].code;
         console.log(this.code);
         if(this.code=='true')
         {
             let toast = this.toastCtrl.create({
              message: 'Deleted Sucessfully',
              duration: 3000,
              position: 'top'
            });
              this.ionViewDidLoad();
            toast.present();
         }
        
    loading.dismiss();
    },error=>{console.log(error)});     
  });

        }
      }
    ]
  });
  alert.present();
}

deletedetail(designation1,email1)
{
    let alert = this.alertCtrl.create({
    title: 'Confirm Delete',
    message: 'Do you want to delete Detail?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          
        }
      },
      {
        text: 'Delete',
        handler: () => {
                   let loading = this.loadingCtrl.create({
    content: 'Deleting detail...'
  });

  loading.present();

  setTimeout(() => {
  let designation=designation1;
  let email12=email1;  
  let data=JSON.stringify({designation,email12});  
  let link = "http://animationcircle.com/AnimationCircle/delete_employment_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
         this.code=data.res[0].code;
         console.log(this.code);
         if(this.code=='true')
         {
             let toast = this.toastCtrl.create({
              message: 'Deleted Sucessfully',
              duration: 3000,
              position: 'top'
            });
              this.ionViewDidLoad();
            toast.present();
         }
        
    loading.dismiss();
    },error=>{console.log(error)});     
  });

        }
      }
    ]
  });
  alert.present();
}

  resumeupload(email,resume_link,resume_upload_date){
            this.navCtrl.push(ResumeuploadPage,{
              resume_link:resume_link,
              resume_upload_date:resume_upload_date,
              email:email
            });

   }

}
