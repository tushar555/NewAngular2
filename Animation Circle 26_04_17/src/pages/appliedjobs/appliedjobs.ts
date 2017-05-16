import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Appliedjobs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-appliedjobs',
  templateUrl: 'appliedjobs.html'
})
export class AppliedjobsPage {
   fetchdata:Array<{name:string,email:string,mobile:string,applied_date:string}>;
   code:any;
  constructor(public http:Http,public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.storage.get("email").then((value)=>{
        let link="http://animationcircle.com/AnimationCircle/applied_job_list.php";
        let email=value;
        let data=JSON.stringify({email});
        this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                     if(data.server_response[0].code==true)
                     {
                         this.fetchdata=data.server_response;
                     }else if(data.server_response[0].code==false){
                        this.code=false;
                     }
                     console.log(data.server_response[0].code);
        })

    });
    
  }

     doRefresh(refresher) 
  {
      //this.email=value;
    //  console.log("iiiIIIIII"+this.uem);
    this.storage.get("email").then((value)=>{
        let link="http://animationcircle.com/AnimationCircle/applied_job_list.php";
        let email=value;
        let data=JSON.stringify({email});
        this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                     if(data.server_response[0].code==true)
                     {
                         this.fetchdata=data.server_response;
                     }else if(data.server_response[0].code==false){
                        this.code=false;
                     }
                     console.log(data.server_response[0].code);
        })

    });

 


    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }



}
