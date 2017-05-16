import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { NavController,MenuController,Platform,NavParams} from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { MainHomePage} from '../main-home/main-home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { AlertController,LoadingController } from 'ionic-angular';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
import { Storage } from '@ionic/storage';
import {SeekerHomePage} from '../seeker-home/seeker-home';
import {Facebook , GooglePlus} from 'ionic-native';
import { NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   login_type:any;
   data: any;
   is_employee:any;
   seeker:any;
   fbdata:any;
   fbdata1:Array<{name:string,email:string}>;
   fbemail:any;
   fbname:any;
   fbmobile:any;
   is_employer:any;
   pages:any;
   email:any;
   login_type_from_signup:any;
  constructor(public storage: Storage,private platform: Platform,public loadingCtrl: LoadingController,
              public navCtrl: NavController,public menu: MenuController,public http: Http,public toastCtrl:ToastController,
              public alertCtrl: AlertController, public navParams: NavParams,public events: Events) {
   this.data={};
  // this.fbdata=[];
  // this.fbdata1={};
  this.email="";
  // this.is_employee=this.navParams.get("is_employee");
   this.seeker="";
    this.data.username="";
    this.data.password="";
     this.login_type=this.navParams.get("login_type");
      this.login_type_from_signup=this.navParams.get("value");//from signup Page 
     this.is_employee= this.login_type;
    this.storage.set("is_employer",this.login_type);

      events.publish('is_employer', this.login_type);
       
  }

ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
  signup()
  {
    this.navCtrl.push(SignupPage);
  }
   home()
  {
    // this.navCtrl.push(MainHomePage);
    this.navCtrl.setRoot(MainHomePage)
  }

  login()
  { 
    let is_employee="";
     if(this.login_type==null)
     {
        is_employee=this.login_type_from_signup;
     }else if(this.login_type_from_signup==null){
         is_employee=this.login_type; 
     } 
     let username=this.data.username;
     let password=this.data.password;
    
    let data=JSON.stringify({username,password,is_employee});
    
    

    if(username=="" || password=="")
    {
      let toast = this.toastCtrl.create({
      message: "Please Fill out all Details",
      duration: 3000
    });
    toast.present(); 

    }
    else{
       let loading = this.loadingCtrl.create({
   // spinner: 'show',
    content: 'Login in...'
  });

  loading.present();

  setTimeout(() => {
        let link = "http://animationcircle.com/AnimationCircle/login.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{ 
      console.log(data);
     if(data.res[0].code=='true')
     {
      let alert = this.alertCtrl.create({
      title: 'Welcome '+data.res[0].name,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //console.log("xcxc"+this.storage.set("name",data.res[0].name));
            this.email=data.res[0].email;
            let email=data.res[0].email;
            let name=data.res[0].name
            //console.log(this.storage.set("email",email));
            
            this.storage.set("name",name);
            this.events.publish('name', name);
          //  console.log("value",data.res[0].email)
            //  this.storage.get("email").then((value)=>{console.log("value",value)});
            
           // console.log("asasa"+this.storage.set("login_type",data.res[0].login_type));
           let is_employer=data.res[0].login_type;
            if(is_employer==1)
            {
                this.navCtrl.setRoot(MainHomePage,{
                  "email":email});
            }else{
                this.navCtrl.setRoot(SeekerHomePage,{"email":email});
            }

          }
        }
      ]
    });
    alert.present();

       
     }else if(data.res[0].code=='not_verify'){

            let toast = this.toastCtrl.create({
              message: "Check Spam/Inbox of your mail to verify email..",
              duration: 3000
            });
            toast.present(); 

     }else{
        let alert = this.alertCtrl.create({
      title: 'Wrong Credentials!',
      subTitle: 'Check the email or password',
      buttons: ['OK']
    });
    alert.present();
     }
       loading.dismiss(); 
    },error=>{console.log(error)});  
    
  
     
  });
    
    }

  }


  forgotpass()
  {
      this.navCtrl.push(ForgotpasswordPage);
  }


  fblogin()
  {
        let permissions = new Array();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let email = response.authResponse.userID+"/?fields=id,email,first_name,last_name";
      let params = new Array();

     

      //Getting name and gender properties
      
      Facebook.api("/me?fields=name,gender,email,first_name", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        let name = user.email;
        let user_name=user.name;
        let pic =user.picture;
      
       if(!user.email)
       {
          let name='not_available';
          let viafb = 'true';
          nav.push(SeekerHomePage,{name,user_name,pic,viafb});
       }else{
         nav.push(SeekerHomePage,{name,user_name,pic});
       }
                
    //     if(!user.email)
    //     {
    //                    let alert = this.alertCtrl.create({
    //           title: 'Welcome '+user_name,
    //           subTitle:"Your Email is not verified, Facebook doesn't provide your email. Please enter your email to continue",
    //           inputs: [
    //             {
    //               name: 'username',
    //               placeholder: 'Username'
    //             }
    //           ],
    //           buttons: [
    //             {
    //               text: 'Cancel',
    //               role: 'cancel',
    //               handler: data => {
    //                 console.log('Cancel clicked');
    //               }
    //             },
    //             {
    //               text: 'Login',
    //               handler: data => {
    //                 let name=data.username;
    //                 nav.push(SeekerHomePage,{name,user_name,pic});
    //                 console.log(data.username);
    //               }
    //             }
    //           ]
    //         });
    //         alert.present();
    //     }else{
    //           nav.push(SeekerHomePage,{name,user_name,pic});
    //     }

      })
    }, function(error){
      console.log(error);
    });

    

  }
  // fblogin()
  // {
  //     Facebook.getLoginStatus().then((response)=>{
  //       if(response.status=="connected")
  //       {
  //         Facebook.api("/"+response.authResponse.userID+ "?fields=id,name,gender,email",[]).then((response)=>
  //         {
  //            let picture = "https://graph.facebook.com/" + response.authResponse.userID + "/picture?type=large";
  //           alert(JSON.stringify(response.email));
          
  //         },(error)=>{ alert(error);}
  //         )
  //       }
  //       else
  //       {
  //             Facebook.login(['email']).then(
  //               (response)=>{
  //                Facebook.getLoginStatus().then((response)=>{
  //                         Facebook.api("/"+response.authResponse.userID+ "?fields=id,name,gender,email",[]).then((response)=>
  //                         {
  //                           let picture = "https://graph.facebook.com/" + response.authResponse.userID + "/picture?type=large";
  //                           alert(JSON.stringify(response.email));
                          
  //                         },(error)=>{ alert(error);}
  //                         )

  //                })
  //             })
  //       }
  //     })
     
  // }


//    signup()
//  {
//    this.navCtrl.push(SignupPage);
//  }

  

}
