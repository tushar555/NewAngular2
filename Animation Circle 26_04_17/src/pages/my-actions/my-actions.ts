import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the MyActions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-actions',
  templateUrl: 'my-actions.html'
})
export class MyActionsPage {
  fetchdata:Array<{"job_id":number,"designation":string,"location":string,"company_name":string,"posted_by":string}>;
  Follow:Array<{"id":number,"company_name":string}>;
  constructor(public http:Http,public storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
   // this.fetchdata={};

  }

  FollowList()
  {
       this.storage.get("email").then((value)=>{
         
       let link ="http://animationcircle.com/AnimationCircle/FollowList.php";
       let email=value;
       let data =JSON.stringify({email});
       this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
          this.Follow=data.res;
          console.log(this.Follow);
       });
   });  
  }

  ionViewDidLoad() {
   this.storage.get("email").then((value)=>{
       let link ="http://animationcircle.com/AnimationCircle/myactions.php";
       let email=value;
       let data =JSON.stringify({email});
       this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
              this.fetchdata=data.response;
          console.log(this.fetchdata);
       });
   });
  }

}
