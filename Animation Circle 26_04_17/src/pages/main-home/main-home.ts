import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { MenuController  } from 'ionic-angular';
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import { SocialSharing } from 'ionic-native';
import {ShowProfilePage} from '../show-profile/show-profile';
import { Events } from 'ionic-angular';
import { PopoverController,Platform} from 'ionic-angular';
import {PopoverPage} from '../popover/popover';
import {DomSanitizer} from '@angular/platform-browser'
declare var cordova: any;
/*
  Generated class for the MainHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main-home',
  templateUrl: 'main-home.html'
})
export class MainHomePage {
  employee:any;
  array:any;
   code:any; 
  code1:any; 
  pages:any;
  email:any;
  image:any;
 myInput:any;
 status:any;
 youlink:any;
 linkarray : Array<any> = [];
  fetchdata:Array<{posted_by_email:string,post_link:string,posted_by_name:string,posted_text:string,image:string,post_date:string,post_time:string,code:string,code1:string,count:number}>;
  fetchdata1:Array<any>=[];
  constructor(public sanitizer:DomSanitizer,public platform: Platform,public popoverCtrl: PopoverController,public loadingCtrl:LoadingController,public http:Http,public navCtrl: NavController, public navParams: NavParams,public menu: MenuController, 
  public storage: Storage, public alertCtrl: AlertController,public events: Events) {
    
      this.code="";
    this.code1="";
    this.employee=1;
    this.myInput="";
     menu.enable(true);
  this.array=[
   {},{},{},{}
  ];
     this.email=this.navParams.get("email");
     if(this.email!=null)
         {
      this.storage.set("email",this.email);
     events.publish('email', this.email);
         }
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

  gotoprofile(posted_by_email)
  {
    let email=posted_by_email;
    console.log(email);
    this.navCtrl.push(ShowProfilePage,{email});
  }
    onInput(myInput){
      console.log("ds",myInput);
      if(myInput==undefined)
      {
        myInput="sdd";
        console.log(myInput);
      }
       this.storage.get("email").then((value)=>{
       
          let email=value; //from storage
          let search =myInput;
          let data=JSON.stringify({email,search}); 
          console.log(data);
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

  doRefresh(refresher) 
  {
  //   let loading = this.loadingCtrl.create({
  //   content: 'Fetching details...'
  // });

  // loading.present();

  // setTimeout(() => {
  //  this.storage.get('email').then((value) => {
  //      let email=value;
  //        let data=JSON.stringify({email}); 
  //         let link = "http://animationcircle.com/AnimationCircle/main_home.php";
  //                   this.http.post(link,data)
  //                   .map(res=>res.json())
  //                   .subscribe(data=>{
  //                   // console.log(data.res[0].message);
  //                   //   let toast = this.toastCtrl.create({
  //                   //   message: data.res[0].message+" ",
  //                   //   duration: 3000
  //                   // });
  //                   // toast.present(); 
                  
  //                   this.fetchdata=data.response;
  //                   console.log(this.fetchdata);
                  
  //                   loading.dismiss();
  //                   //this.navCtrl.push(HomePage);
  //                   },error=>{console.log(error)}); 

  //  });

                 
  // });

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
        let email=value; //from storage...........
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
                }
               
                  loading.dismiss();
                 
                  },error=>{console.log(error)});
      
    });                 
  });

  });
  }
 Like(a)
 {
      this.storage.get("email").then((value)=>{
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
                
            console.log(data);
        });


      });

 }
ionViewDidEnter() {
    this.menu.swipeEnable(true, 'menu1');
  }

  Invite(fetchdata)
  {
    let InviteData=fetchdata;
   let image=InviteData.image;
   let data=InviteData.post_text+" "+InviteData.post_link+", Posted By:"+InviteData.posted_by_name+", Posted On:"+InviteData.post_date;
    SocialSharing.share(data,"Animation Circle"/*Subject*/,image/*File*/,"www.animationcircle.com")
    .then(()=>{
        //alert("Success");
      },
      ()=>{
         //alert("failed")
      })
 
  }


}
