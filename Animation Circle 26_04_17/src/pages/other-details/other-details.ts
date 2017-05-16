
import { MenuController } from 'ionic-angular';
import { Component,OnInit } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import {MyProfilePage} from "../my-profile/my-profile";
/*
  Generated class for the OtherDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-other-details',
  templateUrl: 'other-details.html'
})
export class OtherDetailsPage implements OnInit{

public myForm: FormGroup;
Cartlanguage :  Array<string>;
//Cartlanguage :  Array<string>;
arrayCategories :  Array<string>;
language:Array<string>;
proficiency:Array<string>;
abc:any;
email:any;
code:any;
flag:any;
  constructor(public alertCtrl:AlertController, public menu: MenuController,public navCtrl: NavController, public navParams: NavParams,private _fb: FormBuilder,public http:Http,public alerCtrl: AlertController) 
  {
    this.language=[];
    this.code="";
   
    this.arrayCategories = [];
    this.email=this.navParams.get("email");

  }
  ngOnInit() {
        this.myForm = this._fb.group({
           // name: ['', [Validators.required, Validators.minLength(1)]],
            addresses: this._fb.array([
                this.initAddress(),
            ])
        });
    }

    initAddress() {
        return this._fb.group({
            language: ['']
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
        
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
        this.language.splice(i,1);      
    }

    save() 
    {
      let value=this.myForm.value;
      
       console.log(value);
      for(let count=0; count < value.addresses.length; count++){
           this.language[count] = value.addresses[count].language;
          
      }
    //  console.log(this.language);

     for(let count = 0; count< this.language.length; count++){

        let data={email:this.email, language : this.language[count]}; 
  console.log('data response', data); 
        let link="http://animationcircle.com/AnimationCircle/add_language.php"; 
        this.http.post(link,data)
             .map(res=>res.json())
             .subscribe(data=>{
                  this.code=data.res[0];
                  console.log(data.res[0]);
                  this.alertfun(count);
           })  
    }
    }
    
     alertfun(code)
     {
            if(code<1)
          { let alert = this.alertCtrl.create({
              title: 'Successfully Added!',
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
          }
            // if(code=='true')
            // {
            //     let alert = this.alertCtrl.create({
            //     title: 'Successfully Added!',
            //     buttons: ['OK']
            //     });
            //    alert.present();
            // }
     } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherDetailsPage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
