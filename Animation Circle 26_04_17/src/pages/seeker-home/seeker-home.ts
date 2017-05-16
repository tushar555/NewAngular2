import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController,MenuController,Platform,App } from 'ionic-angular';
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import {WallPostPage} from "../wall-post/wall-post";
import { SocialSharing } from 'ionic-native';
import {ShowProfilePage} from '../show-profile/show-profile';
import { Events } from 'ionic-angular';
import { PopoverController,AlertController } from 'ionic-angular';
import {PopoverPage} from '../popover/popover';
import {DomSanitizer} from '@angular/platform-browser'
declare var cordova: any;
/*
  Generated class for the SeekerHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-seeker-home',
  templateUrl: 'seeker-home.html'
})
export class SeekerHomePage {
seeker:any;
array:any;
 code:any; 
  code1:any;
  pages:any; 
  myInput:any;
  status:any;
  youlink:any;
  linkarray:Array<any>=[];
  fetchdata:Array<{posted_by_email:string,post_link:string,posted_by_name:string,posted_text:string,image:string,post_date:string,post_time:string,code:string,code1:string,count:number}>;
  fetchdata1:Array<any>=[];
  constructor(public app: App,public alertCtrl:AlertController,public sanitizer:DomSanitizer,public platform: Platform,public popoverCtrl: PopoverController,public menu: MenuController,public storage:Storage, public http:Http, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public toastCtrl:ToastController,public events: Events) {
    this.seeker=1;
     this.code="";
    this.code1="";
       	let user_email = this.navParams.get("email");
         //console.log("sds",user_email);
         if(user_email!=null)
         {
              this.storage.set("email",user_email);
              events.publish('email', user_email);
              console.log("HEELLO BRODA");
         }

         this.myInput="";
          let email = this.navParams.get("name");
          let name = this.navParams.get("user_name");
          let pic =this.navParams.get("pic");
          let viafb=this.navParams.get("viafb");
         let is_employee=0;
         console.log("HELLO "+email+"viafb"+viafb);
    if(viafb=='true' && !email || email!=undefined || user_email==''  )
    { 
       console.log("HEELLO FB BRODA");
              if(email=='not_available')
              {

                  // alert("Welcome "+name);
                   let alert = this.alertCtrl.create({
                      title: 'Welcome '+name,
                      subTitle:"Your Email is not verified, Facebook doesn't provide your email. Please enter your email to continue",
                      inputs: [
                        {
                          name: 'username',
                          placeholder: 'Username'
                        }
                      ],
                      buttons: [
                        {
                          text: 'Login',
                          handler: data1 => {
                                                let fbemail=data1.username;
                                                this.storage.set("email",fbemail);
                                                this.storage.set("name",name);
                                                this.storage.set("pic",pic);
                                                events.publish('name', name);
                                                events.publish('email', fbemail);
                                                
                                                this.storage.set("is_employer",0); 
                                                var email=fbemail;
                                                let data=JSON.stringify({name,email,is_employee,pic});
                            
                                            let link = "http://animationcircle.com/AnimationCircle/signup.php";
                                              this.http.post(link,data)
                                              .map(res=>res.json())
                                              .subscribe(data=>{
                                              },error=>{console.log(error)}); 


                          }
                        }
                      ]
                    });
                    alert.present();
              }else
              {
                            this.storage.set("email",email);
                            this.storage.set("name",name);
                            this.storage.set("pic",pic);
                            events.publish('name', name);
                              events.publish('email', email);
                            
                                this.storage.set("is_employer",0); 
                            let data=JSON.stringify({name,email,is_employee,pic});
                      

                        
                        //*****************  
                        let link = "http://animationcircle.com/AnimationCircle/signup.php";
                          this.http.post(link,data)
                          .map(res=>res.json())
                          .subscribe(data=>{
                          },error=>{console.log(error)}); 
              }
    }
 
   
    this.array=[
   {},{},{},{}
  ];

this.storage.get("email").then((val)=>{console.log("Email",val)});


      	platform.registerBackButtonAction(() => {
                                            
                                              this.myHandlerFunction();
                                            
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }

 openurl(url)
 {
   this.platform.ready().then(()=>{
       cordova.InAppBrowser.open(url, "_system", "location=true");
   });
   
 }
    onInput(myInput){
      this.storage.get("email").then((value)=>{
              let email=value; //from storage
              let search =myInput;
              let data=JSON.stringify({email,search}); 
              let link = "http://animationcircle.com/AnimationCircle/main_home.php";
                        this.http.post(link,data)
                        .map(res=>res.json())
                        .subscribe(data=>{
                        let statuscode=data.response[0].statuscode;
                       if(statuscode=='false')
                        {
                            this.status='c_false';
                        }else if(statuscode=='true'){
                              this.fetchdata=data.response;
                               for(let i=0;i<this.fetchdata.length;i++)
                                {
                                  
                                    let newdata=this.fetchdata[i];
                                    this.youlink=this.sanitizer.bypassSecurityTrustResourceUrl(this.fetchdata[i].post_link.replace("watch?v=","embed/"));
                                    let newlink=this.youlink;
                                      
                                    this.fetchdata1[i]=[
                                                          newdata,newlink
                                                      ];
                                  
                                            
                                }
                 
                                 this.linkarray=this.fetchdata1;
                             
                        }
                        },error=>{console.log(error)}); 

      });
  }
 
  onCancel(myInput){

  }
  WallPost()
  {
    this.storage.get("email").then((value)=>{
      let email=value;
      console.log("Value",value);
      this.navCtrl.push(WallPostPage,{email});
    });
    
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
     // this.uem=value;
    //  console.log("iiiIIIIII"+this.uem);
         let loading = this.loadingCtrl.create({
    content: 'Fetching details...'
  });

  loading.present();

  setTimeout(() => {
      this.storage.get('email').then((value) => {
      let email=value; 
      let data=JSON.stringify({email}); 
      let link = "http://animationcircle.com/AnimationCircle/main_home.php";
                this.http.post(link,data)
                .map(res=>res.json())
                .subscribe(data=>{          
                let statuscode=data.response[0].statuscode;
                console.log(statuscode);
                if(statuscode=='false')
                {
                    this.status=false;
                }else if(statuscode=='true'){
                       this.fetchdata=data.response;
                       this.status=true;
                   for(let i=0;i<this.fetchdata.length;i++)
                  {
                    
                       let newdata=this.fetchdata[i];
                       this.youlink=this.sanitizer.bypassSecurityTrustResourceUrl(this.fetchdata[i].post_link.replace("watch?v=","embed/"));
                       let newlink=this.youlink;
                        
                       this.fetchdata1[i]=[
                                            newdata,newlink
                                        ];
                    
                               
                  }
                 
                  this.linkarray=this.fetchdata1;
                  console.log(this.linkarray)
                }
                
                loading.dismiss();
                //this.navCtrl.push(HomePage);
                },error=>{console.log(error)}); 
          });

                 
  });

  });
  }

 gotoprofile(posted_by_email)
  {
    let email=posted_by_email;
    console.log(email);
    this.navCtrl.push(ShowProfilePage,{email});
  }

   Like(a)
 {
      console.log(a);
      this.storage.get('email').then((value) => {
        let post_id=a.id;
        let email=value;
        let data=JSON.stringify({post_id,email});
        let link="http://animationcircle.com/AnimationCircle/like_post.php";
        this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
            // if(data.response.code=="true")
            // {
            //      this.code=false;
            //      this.code1=true;
            // }
            // else
            // {
            //     this.code=true;
            //     this.code1=false;
            // }
          let data1=JSON.stringify({email});
          let link="http://animationcircle.com/AnimationCircle/main_home.php";
          this.http.post(link,data1).map(res=>res.json()).subscribe((data2)=>{

              this.fetchdata=data2.response;
              for(let i=0;i<this.fetchdata.length;i++)
                  {
                    
                       let newdata=this.fetchdata[i];
                       this.youlink=this.sanitizer.bypassSecurityTrustResourceUrl(this.fetchdata[i].post_link.replace("watch?v=","embed/"));
                       let newlink=this.youlink;
                        
                       this.fetchdata1[i]=[
                                            newdata,newlink
                                        ];
                           
                  }
                 
                  this.linkarray=this.fetchdata1;

          });
                
           // console.log(data);
        });
      });

 }

  Invite(fetchdata)
  {
    let InviteData=fetchdata;
   let image=InviteData.image;
   let data=InviteData.post_text+" "+InviteData.post_link+", Posted By:"+InviteData.posted_by_name+", Posted On:"+InviteData.post_date;
   console.log(InviteData);
   console.log(data);
    SocialSharing.share(data,"Animation Circle"/*Subject*/,InviteData.image/*File*/,"www.animationcircle.com")
    .then(()=>{
        //alert("Success");
      },
      ()=>{
         //alert("failed")
      })
 
  }


}
