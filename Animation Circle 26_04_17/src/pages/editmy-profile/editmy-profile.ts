import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FileChooser,Transfer,File,FilePath} from 'ionic-native';
import { ProfilePicUpdatePage } from '../profile-pic-update/profile-pic-update';
import {Storage} from '@ionic/storage';
import {EmployeeProfilePagePage} from '../employee-profile-page/employee-profile-page';
/*
  Generated class for the EditmyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editmy-profile',
  templateUrl: 'editmy-profile.html'
})
export class EditmyProfilePage {
   email:any;
   data:any;
   image:any;
   current_company_address:any;
   mobile:any;
   current_company:any;
   current_designation:any;
   name:any;
   fetchdata:any;
  // fetchdata:any;
  constructor(public storage:Storage, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public http:Http,public toastCtrl:ToastController) {
    this.data={};
    this.fetchdata=this.navParams.get("fetchdata");
    console.log(this.fetchdata);
    if(this.fetchdata.profile_pic=="")
        this.image="";
    else  
        this.image=this.fetchdata.profile_pic;  
    this.email=this.fetchdata.email;

    console.log(this.image);
   }

  update(data1)
  {
    let email=this.email;
    let email1=data1.email;
    let name=data1.name;
    console.log("New_name"+name);
    let current_designation=data1.current_designation;
    let current_company=data1.current_company;
    let mobile=data1.mobile;
    let current_company_address=data1.current_company_address;
    let data=JSON.stringify({email,email1,name,current_designation,current_company,mobile,current_company_address});  
    let loading = this.loadingCtrl.create({
    content: 'Updating Profile...'
  });

  loading.present();

  setTimeout(() => {
  //*****************  
  let link = "http://animationcircle.com/AnimationCircle/update_employer_profile_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
     if(data.res[0].code=='true')
     {
         console.log("Tikdun Alela"+data.res[0].nm);
          let toast = this.toastCtrl.create({
          message: "Profile updated Successfully!!",
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
        this.navCtrl.push(EmployeeProfilePagePage);
     }      
    },error=>{console.log(error)}); 
     
  });  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditmyProfilePage');
  }

 Upload()
  {
    this.storage.get("email").then((value)=>{
                    FileChooser.open()
  .then((uri) =>{
        FilePath.resolveNativePath(uri)
        .then(filePath => {

          // this.profilepic=filePath;
        this.image=filePath;
        
    //  this.storage.get('email').then((value) => { 
    let loading = this.loadingCtrl.create({
    content: 'Uploading...'
  });

  loading.present();

  setTimeout(() => {

       var link ="http://animationcircle.com/AnimationCircle/upload_profile.php";
      //  var currentName = filePath.replace(/^.*[\\\/]/, '');
      //  var temp=this.email.replace(/^.*[\\\/]/, '');
        var newEmail=value.replace(/[.com]/,''); 
      //   var d = new Date();
      //   var n = d.getTime();
      
      var newFileName =  newEmail+"_profile"+".jpg"; 
      const fileTransfer = new Transfer();
        var options: any;

        options = {
           fileKey: 'file',
           fileName: newFileName,
           mimeType: 'image/jpeg',
            chunkedMode: false,
           headers: {'Content-Type' : undefined},
             params : {'fileName': newFileName}
           
        }
        
        fileTransfer.upload(filePath, link,options)
         .then((data) => {
             let email=value;
             let data1=JSON.stringify({newFileName,email});

             let link1 = "http://animationcircle.com/AnimationCircle/insert_profile_link.php";
              this.http.post(link1,data1)
              .map(res=>res.json())
              .subscribe(data=>{
                 
                
              loading.dismiss();
              },error=>{console.log(error)}); 

           loading.dismiss();
         }, (err) => {
           alert(err);
         })   
  });  
    // });
        })
    .catch(e => console.log(e));
  } )
  .catch(e => console.log(e));

    });

  }

 

}
