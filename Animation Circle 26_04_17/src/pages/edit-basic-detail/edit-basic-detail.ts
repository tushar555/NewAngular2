import { Component } from '@angular/core';
import { NavController, MenuController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
import {LoadingController,AlertController,ToastController} from 'ionic-angular';
import {MyProfilePage} from '../my-profile/my-profile';
import {FileChooser,Transfer,File,FilePath} from 'ionic-native';
/*
  Generated class for the EditBasicDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-basic-detail',
  templateUrl: 'edit-basic-detail.html'
})
export class EditBasicDetailPage {
  data:any;
  uem:any;
  name:any;
  current_designation:any;
  current_location:any;
  total_experience:any;
  total_experience_month:any;
  current_salary:any;
  image:any;
  constructor(public http: Http,public storage: Storage,public toastCtrl:ToastController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public navCtrl: NavController, public menu: MenuController) {
     this.data={};
     this.data.uem=navParams.get('email');
     this.data.name=navParams.get('name');
     this.data.current_designation=navParams.get('current_designation');
     this.data.current_location=navParams.get('current_location');
     this.data.total_experience=navParams.get('total_experience');
     this.data.total_experience_month=navParams.get('total_experience_month');
     this.data.current_salary=navParams.get('current_salary');
  }
  save(data)
  {
    this.data.uem=data.uem;
    let loading = this.loadingCtrl.create({
    content: 'Saving details...'
  });

  loading.present();

  setTimeout(() => {
  let uem1=this.data.uem;
  let name1=this.data.name;
  let current_designation1=this.data.current_designation;
  let current_location1=this.data.current_location;
  let total_experience1=this.data.total_experience;
  let total_experience_month1=this.data.total_experience_month;
  let new_current_salary1=this.data.current_salary;
   
  let data=JSON.stringify({uem1,name1,current_designation1,current_location1,total_experience1,total_experience_month1,new_current_salary1});  
  let link = "http://animationcircle.com/AnimationCircle/update_employee_details.php";
    this.http.post(link,data)
    .map(res=>res.json())
    .subscribe(data=>{
      if( data.res[0].code=='true')
      {
          let toast = this.toastCtrl.create({
          message: "Profile Updated",
          duration: 3000
        });
        toast.present();
      }   
    loading.dismiss();
     this.navCtrl.push(MyProfilePage);
    },error=>{console.log(error)});     
  });
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
                 
                let toast = this.toastCtrl.create({
                message: "Profile Picture Updated",
                duration: 3000
              });
              toast.present();
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditBasicDetailPage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
