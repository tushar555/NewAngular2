import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
/*
  Generated class for the SpecificChat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-specific-chat',
  templateUrl: 'specific-chat.html'
})
export class SpecificChatPage {
  opponent_email:any;
  my_email:any;
  withname:any;
 // getChat:any;
  chat:any;
  getChat:Array<any>=[];
  constructor(public loadingCtrl:LoadingController,public toastCtrl:ToastController,
  public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:Http) {
     this.getChat=[];
     this.chat={};
     this.opponent_email=navParams.get("opponent_email");
     this.my_email=navParams.get("my_email");
     this.withname=navParams.get("withname");
     console.log("sender",this.opponent_email);
     console.log("receiver",this.my_email);
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
    content: 'Loading chat...'
  });

  loading.present();

  setTimeout(() => {

   	let link = 'http://animationcircle.com/AnimationCircle/show_chat.php';
   	let getData = {senderEmail : this.my_email, receiverEmail : this.opponent_email};
    console.log("older History Emails",getData);
    this.http.post(link, getData)
    	.map(res => res.json())
    	.subscribe(data => {
    		
    		this.getChat = data.server_response;
    		console.log('gettt:', this.getChat);
        loading.dismiss();
    	});     
  });   


  }

  sendMessage(chat){
     console.log(chat.msg);
     if(chat.msg == undefined)
     {
        let toast = this.toastCtrl.create({
            message: 'Message can not be empty',
            duration: 3000
          });
          toast.present();
     }
     else{
         	let link = 'http://animationcircle.com/AnimationCircle/chat.php';
        	let getData = {senderEmail :  this.my_email, receiverEmail : this.opponent_email, message : chat.msg};
         this.http.post(link, getData)
      .map(res => res.json())
      .subscribe(data => {
        
           	let link = 'http://animationcircle.com/AnimationCircle/show_chat.php';
            let getData = {senderEmail : this.my_email, receiverEmail : this.opponent_email};
            console.log("older History Emails",getData);
            this.http.post(link, getData)
              .map(res => res.json())
              .subscribe(data => {
                
                this.getChat = data.server_response;
                console.log('gettt:', this.getChat);
                chat.msg="";
              });
        // this.getChat = data.server_response;
        // console.log('send Chat :', data.server_response);
      });

     }
    

  }


}
