import { Component ,ViewChild } from '@angular/core';
import { Platform,AlertController,App } from 'ionic-angular';
import { StatusBar, Splashscreen,SQLite } from 'ionic-native';
import { Nav } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
//import {SeekerHomePage} from '../pages/seeker-home/seeker-home';
import { PostAJobPage } from '../pages/post-a-job/post-a-job';
import { MyProfilePage } from '../pages/my-profile/my-profile';
//import { ChatscreenPage } from '../pages/chatscreen/chatscreen';
import { MychatPage } from '../pages/mychat/mychat';
import {JobDetailsPage} from '../pages/job-details/job-details';
import {NewJobPage} from '../pages/new-job/new-job';
import {MainHomePage} from '../pages/main-home/main-home';
import {SearchProfilePage} from '../pages/search-profile/search-profile';
import { Diagnostic } from 'ionic-native';
import {EmployeeProfilePagePage} from '../pages/employee-profile-page/employee-profile-page';
import {SeekerHomePage} from '../pages/seeker-home/seeker-home';
import {Network} from 'ionic-native';
import { Storage } from '@ionic/storage';
import {MyActionsPage} from '../pages/my-actions/my-actions';
import {CompanylistPage} from '../pages/companylist/companylist';
import { SocialSharing } from 'ionic-native';
import {LoginselectionPage} from '../pages/loginselection/loginselection';
import {AppliedjobsPage} from '../pages/appliedjobs/appliedjobs';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import {Facebook} from 'ionic-native';
//import {SeekerHomePage} from '../pages/seeker-home/seeker-home';
declare var navigator: any;
declare var Connection: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage :any;
  uem:any;
  login_type:any;
  employee:any;
  seeker:any;
  is_employer:any;
  usertype:any;
  profile_pic:any;
  backflag:any;
  pages:Array<{title:string,component:any,icon:any}>;

  constructor(public events: Events,public storage: Storage,public http: Http,public platform: Platform,public alertCtrl:AlertController,public app: App) {
      this.backflag=0;
      platform.ready().then(() => { 
          var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection : OK';
      states[Connection.WIFI]     = 'WiFi connection : OK';
      states[Connection.CELL_2G]  = 'Cell 2G connection : OK';
      states[Connection.CELL_3G]  = 'Cell 3G connection : OK';
      states[Connection.CELL_4G]  = 'Cell 4G connection : OK';
      states[Connection.CELL]     = 'Cell generic connection : OK';
      states[Connection.NONE]     = 'No network connection';
      if(states[networkState]=="No network connection")
      {
        let alert = this.alertCtrl.create({
        title: "Connection Status",
        subTitle: states[networkState],
        buttons: [ {
        text: 'Go to Settings',
        role: 'cancel',
        handler: () => {
           alert.dismiss().then(() => {
              Diagnostic.switchToMobileDataSettings();
              
            })
        }
      },
       {
        text: 'Close',
        role: 'cancel',
        handler: data => {
         	this.platform.exitApp();
        }
      }]
    });
      alert.present();
      }
     console.log("oyee hoye");

       Splashscreen.hide();
     });


     this.events.subscribe('email',(email) => {
              this.uem=email;
             
              let link="http://animationcircle.com/AnimationCircle/get_profile_pic.php";
              let data=JSON.stringify({email});
              this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                if(data.res.length!=0)
                  this.profile_pic=data.res[0].profile_pic;
                else
                  this.profile_pic="";   
                
              });
               console.log("HEELLO BE"+email);
          });
     this.storage.get('email').then((value)=>{
       this.uem=value;
       let email=value;
       console.log("HEELLO SEXY"+value);
              let link="http://animationcircle.com/AnimationCircle/get_profile_pic.php";
              let data=JSON.stringify({email});
              this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                  console.log("Kola",data.res);
                  if(data.res.length!=0)
                    this.profile_pic=data.res[0].profile_pic;
                 else
                    this.profile_pic="";  
              });

             console.log("ALA RE"+this.uem); 
       if(value!=null)
       {
                 this.storage.get('is_employer').then((ltype)=>{
                  if(ltype==0)
                   {
                      console.log("Login Type",ltype);
                          this.login_type=ltype;
                        this.pages = [
                                  { title: 'Home', component: SeekerHomePage , icon:"img/home.png"},
                                  { title: 'Search Jobs', component: PostAJobPage, icon:"img/findjob.png" },
                                  { title: 'Top Companies', component: CompanylistPage , icon:"img/company.png"},
                                  { title: 'My Actions', component: MyActionsPage, icon:"img/action.png" },
                                  { title: 'My Chats', component: MychatPage , icon:"img/allchat.png" },
                                  // { title: 'My Profile', component: MyProfilePage ,icon:"img/userprofile.png"}
                                        ];        
                        this.rootPage=SeekerHomePage;
                    }else if(ltype==1)
                    { 
                                  this.login_type=ltype;
                                  this.pages = [
                                  { title: 'Home', component: MainHomePage ,icon:"img/home.png"},
                                  { title: 'Post A Job', component: NewJobPage, icon:"img/postjob.png" },
                                  { title: 'Search Profile', component: SearchProfilePage, icon:"img/jobsearch.png" },
                                  // { title: 'My Profile', component: EmployeeProfilePagePage, icon:"img/userprofile.png"},
                                  { title: 'Job Applicants', component: AppliedjobsPage,icon:"img/jobapplication.png" },
                                  { title: 'My Chats', component: MychatPage, icon:"img/allchat.png" }
                                        ];   
                        this.rootPage=MainHomePage;
                    }

                    });
       }

else if(value==null)
      {
                let alert = this.alertCtrl.create({
                title: 'Select User Type',
                //message: 'Do you want to buy this book?',
                buttons: [
                  {
                    text: 'Recruiter',
                    //role: 'cancel',
                    handler: () => {
                     this.pages = [
                    { title: 'Home', component: MainHomePage ,icon:"img/home.png"},
                    { title: 'Post A Job', component: NewJobPage, icon:"img/postjob.png" },
                    { title: 'Search Profile', component: SearchProfilePage, icon:"img/jobsearch.png" },
                    // { title: 'My Profile', component: EmployeeProfilePagePage, icon:"img/userprofile.png"},
                    { title: 'Job Applicants', component: AppliedjobsPage,icon:"img/jobapplication.png" },
                    { title: 'My Chats', component: MychatPage, icon:"img/allchat.png" }
                          ]; 
                           this.nav.setRoot(HomePage,{login_type:1}); 
                    }
                    
                  },
                  {
                    text: 'Seeker',
                    handler: () => {
                     this.pages = [
                    { title: 'Home', component: SeekerHomePage , icon:"img/home.png"},
                    { title: 'Search Jobs', component: PostAJobPage, icon:"img/findjob.png" },
                    { title: 'Top Companies', component: CompanylistPage , icon:"img/company.png"},
                    { title: 'My Actions', component: MyActionsPage, icon:"img/action.png" },
                    { title: 'My Chats', component: MychatPage , icon:"img/allchat.png" },
                    // { title: 'My Profile', component: MyProfilePage ,icon:"img/userprofile.png"}
                          ];
                          this.nav.setRoot(HomePage,{login_type:0});
                    }
                  }
                ]
              });
              alert.present();
       
      }

     });

                                      			platform.registerBackButtonAction(() => {
                                            let nav = this.app.getActiveNav();
                                            if (nav.canGoBack()){ //Can we go back?
                                              nav.pop();
                                            }else{
                                              this.backflag +=1;
                                              this.myHandlerFunction();
                                            }
                                          });



             
  //});

    
  }

    initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }


openprofile(uem)
{
  this.storage.get("is_employer").then((value)=>{
     if(value==0)
      this.nav.push(MyProfilePage);
   else
       this.nav.push(EmployeeProfilePagePage); 
  });

}

  Invite()
  {
    let link ="http://animationcircle.com/AnimationCircle/invite.php";
    this.http.get(link).map(res=>res.json()).subscribe((data)=>{ 
         let applink=data.server_response;
         let app_data=data.server_response1;
         let app_image=data.server_response2;
         SocialSharing.share(app_data,"Animation Circle App"/*Subject*/,app_image/*File*/,applink)
            .then(()=>{
                      //alert("Success");
                      },
                 ()=>{
                      //alert("failed")
                   })  
        }); 
  }

  	myHandlerFunction(){

     
          		let alert = this.alertCtrl.create({
              title: 'Exit?',
              message: 'Do you want to exit the app?',
              buttons: [
              {
                text: 'Exit',
                handler: () => {
                  this.platform.exitApp();
                }
              },
              {
                text: 'Continue',
                role: 'cancel',
                handler: () => {

                }
              }
              ]
            });
            alert.present();
     

	} 

   signout()
  {
    let alert = this.alertCtrl.create({
    title: 'Confirm Exit',
    message: 'Do you want to exit?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Logout',
        handler: () => {
                this.storage.clear();
                const index = this.nav.getActive().index;
                this.nav.remove(0, index);
                 Facebook.logout().then(
                  (response)=>{
                  //alert(JSON.stringify(response));
                },(error)=>{
                 // alert(error);
                })
                this.platform.exitApp()
        }
      }
    ]
  });
  alert.present();

      //   this.nav.push(LoginselectionPage).then(() => {
        
      // });   
  }
  openPage(page){
    this.nav.push(page.component);
  }



}
