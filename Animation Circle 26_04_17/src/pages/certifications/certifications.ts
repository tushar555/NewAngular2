import { Component,OnInit } from '@angular/core';
import { NavController, MenuController,NavParams,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import {MyProfilePage} from "../my-profile/my-profile";
/*
  Generated class for the Certifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-certifications',
  templateUrl: 'certifications.html'
})
export class CertificationsPage {
  email1:any;
  public myForm: FormGroup;
  certificate:Array<string>; 
  status:any;
  flag:any;
  constructor(public http:Http,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,private _fb: FormBuilder) {
    this.flag=0;
    this.email1=navParams.get("email");
    this.certificate=[];
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
            certificate: ['']  
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
        
    }

    save() 
    {
      let value=this.myForm.value;
      
       console.log(value);
       for(let count=0; count < value.addresses.length; count++){
            this.certificate[count] = value.addresses[count].certificate;  
      }
    

      for(let count = 0; count< this.certificate.length; count++){
        if(this.certificate[count]=="")
        {
          continue;
        }
        else{
                    let data={email1:this.email1, certificate : this.certificate[count]};  
                      let link="http://animationcircle.com/AnimationCircle/add_key_skills&certifications.php"; 
                      this.http.post(link,data)
                          .map(res=>res.json())
                          .subscribe(data=>{
                                this.status=data.res[0].code;
                                console.log(data.res[0]);
                                  this.flag=1; 
                        }) 
                        this.alertfunc(count); 
             }
     
      }
    
    } 

   alertfunc(count)
    {
         if(count<1)
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
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CertificationsPage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
