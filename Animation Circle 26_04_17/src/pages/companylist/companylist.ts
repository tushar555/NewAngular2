import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
/*
  Generated class for the Companylist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-companylist',
  templateUrl: 'companylist.html'
})
export class CompanylistPage {
  company:Array<{id:number,company_name:string}>;
  email:any;
 code:any; 
  code1:any; 
  constructor(public storage:Storage,public http:Http,public navCtrl: NavController, public navParams: NavParams) {
   // this.email="nitin@nitin.com";
    
   this.code="";
    this.code1="";
  }


  ionViewDidLoad() {
    this.storage.get("email").then((value)=>{
        let email=value;
        let data=JSON.stringify({email});
        let link="http://animationcircle.com/AnimationCircle/company.php";
        this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
          this.company=data.response;
          
            console.log(data);
        });
    });

  }

  doRefresh(refresher) 
  {
  
      this.ionViewDidLoad() ;


    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

    follow(c)
    {
      this.storage.get("email").then((value)=>{
          let company_name=c.company_name;
          let email=value;
          let data=JSON.stringify({company_name,email});
          let link="http://animationcircle.com/AnimationCircle/follow_company.php";
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
            let link="http://animationcircle.com/AnimationCircle/company.php";
            this.http.post(link,data1).map(res=>res.json()).subscribe((data2)=>{

                this.company=data2.response;
            });
                  
              console.log(data);
          });
          });
      
    }

}
