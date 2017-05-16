import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {FileChooser,Transfer,File,FilePath} from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {MyProfilePage} from '../my-profile/my-profile';
declare var cordova:any;
/*
  Generated class for the Resumeupload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resumeupload',
  templateUrl: 'resumeupload.html'
})
export class ResumeuploadPage {
   resume_link:any;
   resume_upload_date:any;
   email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public loadingCtrl:LoadingController,public http:Http,public storage:Storage) {
     this.email= this.navParams.get("email");
     this.resume_upload_date=this.navParams.get("resume_upload_date");
     this.resume_link=this.navParams.get("resume_link");
  }

  uploadResume(){
      FileChooser.open()
  .then((uri) =>{
        FilePath.resolveNativePath(uri)
        .then(filePath => {

       this.storage.get('email').then((value) => {
      
         let loading = this.loadingCtrl.create({
    content: 'Uploading...'
  });

  loading.present();

  setTimeout(() => {

       var link ="http://animationcircle.com/AnimationCircle/uploadresume.php";
       var currentName = filePath.replace(/^.*[\\\/]/, '');
       var newemail=value.replace(/^.*[\\\/].com/, '');
        var d = new Date();
        var n = d.getTime();
        var newFileName =  n +newemail + ".docx";

       
      const fileTransfer = new Transfer();
        var options: any;

        options = {
           fileKey: 'file',
           fileName: newFileName,
           mimeType: 'image/jpeg',
            chunkedMode: false,
           headers: {'Content-Type' : undefined},
             params : {'fileName': newFileName,'email':value}
           
        }
        fileTransfer.upload(filePath, link,options)
         .then((data) => {
             let data1=JSON.stringify({newFileName,value});

             let link1 = "http://animationcircle.com/AnimationCircle/insert_resumelink.php";
              this.http.post(link1,data1)
              .map(res=>res.json())
              .subscribe(data=>{
                 
                 let alert = this.alertCtrl.create({
                  title: 'Resume Uploaded!',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.push(MyProfilePage);
                      }
                    }
                  ]
                });
                alert.present();
                
              loading.dismiss();
              },error=>{alert(error)}); 

           loading.dismiss();
         }, (err) => {
           alert(err);
         })   
  });

  });
        })
    .catch(e => console.log(e));
  } )
  .catch(e => console.log(e));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumeuploadPage');
  }

}
