import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {FileChooser,Transfer,File,FilePath} from 'ionic-native';
import {SeekerHomePage} from '../seeker-home/seeker-home';
/*
  Generated class for the WallPost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wall-post',
  templateUrl: 'wall-post.html'
})
export class WallPostPage {

  email:any;
  image:any;
  link_upload:any;
  new_post_text_links:any;
  constructor(public loadingCtrl:LoadingController,public storage:Storage,public http:Http,public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController) {
    this.email=this.navParams.get("email");
    this.link_upload='true';
      this.storage.get("email").then((value)=>{console.log("value",value)});
   //this.email="nitin@nitin.com";
  }

  Post(post_text,post_text_links)
  {
      
              let text_on_wall=post_text;
            
              let email=this.email;
              console.log("Text",text_on_wall);
              console.log("email",post_text_links);
              
              if(text_on_wall==null)
              {
                        let toast = this.toastCtrl.create({
                        message: "Empty post cannot be accepted",
                        duration: 3000
                      });
                      toast.present(); 
              }else{
                       console.log("HII");
                      if(post_text_links!=null || post_text_links!=undefined)
                      {
                          
                        if(post_text_links.includes("youtu.be"))
                        {
                            this.new_post_text_links=post_text_links.replace("youtu.be", 'youtube.com/embed');
                            //console.log(news);
                        }else if(post_text_links.includes("watch?v="))
                         {
                          this.new_post_text_links= post_text_links.replace("watch?v=",'embed/');
                            //console.log(newss);
                         }else
                         {
                            this.new_post_text_links= post_text_links;
                         } 
                        

                         
                            let loading = this.loadingCtrl.create({
                        // spinner: 'show',
                          content: 'Posting...'
                        });

                        loading.present();

                        setTimeout(() => {
                        //***************** 
                          let link_on_wall=this.new_post_text_links; 
                                  let data=JSON.stringify({text_on_wall,link_on_wall,email});
                                  console.log(data);
                                let link="http://animationcircle.com/AnimationCircle/wall_post.php";
                                this.http.post(link,data).map((res)=>res.json()).subscribe((data)=>{
                                  console.log(data);
                                  if(data.response[0].code=="true")
                                  {
                                      let toast = this.toastCtrl.create({
                                      message: data.response[0].message+" ",
                                      duration: 3000
                                    });
                                    toast.present(); 
                                        }
                                        this.navCtrl.push(SeekerHomePage);
                                });
                          loading.dismiss(); 
                        });
                        
                      }
                    
              }

          
  }

  Upload()
  {
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

       var link ="http://animationcircle.com/AnimationCircle/upload.php";
      //  var currentName = filePath.replace(/^.*[\\\/]/, '');
      //  var temp=this.email.replace(/^.*[\\\/]/, '');
        var newEmail=this.email.replace(/[.com]/,''); 
        var d = new Date();
        var n = d.getTime();
       
      var newFileName =  n+newEmail+"_wallpost"+".jpg"; 
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

             this.link_upload='false';
             let email=this.email;
             let data1=JSON.stringify({newFileName,email});

             let link1 = "http://animationcircle.com/AnimationCircle/upload_wall_image.php";
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WallPostPage');
  }

}
