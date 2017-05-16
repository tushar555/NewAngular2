import { Component } from '@angular/core';
import { NavController, MenuController,NavParams,LoadingController,ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the WorkDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-work-details',
  templateUrl: 'work-details.html'
})
export class WorkDetailsPage {
  email:any;
  data:any;
  fetchdata:any;
  job_preference:any;
  desired_employment_type:any;
  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams,public http: Http,public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
    this.job_preference="";
    this.desired_employment_type="";
    this.email=navParams.get("email");
    this.data={};
    this.fetchdata={};
      let loading = this.loadingCtrl.create({
    content: 'Fetching Work details...'
  });

  loading.present();

  setTimeout(() => {
  let email=this.email;  
  let data=JSON.stringify({email});  
  let link = "http://progressiveit.in/Thomas/fetch_update_work_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
         this.data=data.res[0];
    loading.dismiss();
    },error=>{console.log(error)});     
  });

  }
   save(data1)
  {
    let email1=this.email; 
    let industry=data1.industry;
    let functional_area=data1.functional_area;
    let role=data1.role;
    //let job_preference;
    //console.log(data1.job_preference);
    //console.log(data1.job_preference1);
    if(data1.job_preference==true && data1.job_preference1==true)
    {
      this.job_preference="Permanent Contractual";
    }else if(data1.job_preference==true)
    {
        this.job_preference="Permanent";
    }
    else if(data1.job_preference1==true)
    {
        this.job_preference="Contractual";
    }
    let job_preference=this.job_preference;
  
    if(data1.desired_employment_type==true && data1.desired_employment_type1==true)
    {
       this.desired_employment_type="Full_time Part_time";
    }
     else if(data1.desired_employment_type==true)
    {
        this.desired_employment_type="Full_time";
    }
     else if(data1.desired_employment_type1==true)
    {
        this.desired_employment_type="Part_time";
    }
     let desired_employment_type=this.desired_employment_type;
    let preferred_location=data1.preferred_location;
    let available_join=data1.available_join;
    let work_authorization=data1.work_authorization;
    
    let data=JSON.stringify({email1,industry,functional_area,role,job_preference,desired_employment_type,preferred_location,available_join,work_authorization});
    if(industry=="" || functional_area=="" || role=="" || available_join=="" || work_authorization=="" )
    {
      let toast = this.toastCtrl.create({
      message: "Please Fill out all Details",
      duration: 3000
    });
    toast.present(); 

    }
    else{  
           let loading = this.loadingCtrl.create({
           content: 'Adding Education Details...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
  let link = "http://animationcircle.com/AnimationCircle/fetch_update_work_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
     if(data.update_res[0].code=='true')
     {
          let toast = this.toastCtrl.create({
          message: "Work Details Updated Successfully!!",
          duration: 3000
        });
        toast.present(); 
        loading.dismiss();
     }else{
        let toast = this.toastCtrl.create({
          message: "Can't Update!!",
          duration: 3000
        });
        toast.present(); 
        loading.dismiss();
     }      
    },error=>{console.log(error)}); 
     
  });   
    }
 
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkDetailsPage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
