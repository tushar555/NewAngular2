import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { MainHomePage } from '../main-home/main-home';
import {SpecificChatPage} from '../specific-chat/specific-chat';
import {Storage} from '@ionic/storage';
/*
  Generated class for the Mychat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mychat',
  templateUrl: 'mychat.html'
})
export class MychatPage {
	chat : any;
	getChat : Array<any> = [];
  getData : any;
  list_code:any;
  code:any;
  constructor(public storage:Storage,public navCtrl: NavController, private http : Http, public loadingCtrl:LoadingController) {
    this.getData={};
    this.getChat = [];
    this.chat = {};
    this.chat.msg = '';
    this.list_code="";
    
    this.storage.get("is_employer").then((value)=>{
        this.code=value;
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

   let loading = this.loadingCtrl.create({
   // spinner: 'show',
    content: 'Loading Chats...'
  });

  loading.present();

  setTimeout(() => {

            this.storage.get("email").then((value)=>{
                let link = 'http://animationcircle.com/AnimationCircle/chat_list.php';
                console.log(value);
                let getData = {adminEmail : value};
                console.log("mychat",getData);
                this.http.post(link, getData)
                .map(res => res.json())
                .subscribe(data => {
                      let code =data.code;
                      if(code=="list")
                      {
                          this.list_code=code;
                          this.getChat = data.server_response;
                      }else if(code=="no_list")
                       {
                          this.list_code=code; 
                        } 
                  console.log(this.getChat);
                  loading.dismiss();
                  });
              });     
  });
  }
specific_chat(withemail,withname)
{ 
  console.log("Chat With:"+withemail);
  //console.log(chat);
   this.storage.get("email").then((value)=>{
     console.log("Stored email:"+value);
    //let chat_with=chat.sender_email;
   this.navCtrl.push(SpecificChatPage,{
     opponent_email:withemail,
     my_email:value,
     withname :withname
   })
  
   });

}

  mainhomepage()
  {
    this.navCtrl.push(MainHomePage);
  }

}
