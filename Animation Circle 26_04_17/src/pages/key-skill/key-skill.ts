import { Component,OnInit } from '@angular/core';
import { NavController, MenuController,NavParams,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import {MyProfilePage} from "../my-profile/my-profile";

/*
  Generated class for the KeySkill page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-key-skill',
  templateUrl: 'key-skill.html'
})
export class KeySkillPage implements OnInit{
email:any;
public myForm: FormGroup;
key_skill:Array<string>;
status:any;

  constructor(public http:Http,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,private _fb: FormBuilder) {
    this.email=navParams.get("email");
    this.key_skill=[];
   // this.code="";
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
            key_skill: ['']  
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
        
    }

      removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
        this.key_skill.splice(i,1);      
    }
    save() 
    {
      let value=this.myForm.value;
      
       console.log(value);
       for(let count=0; count < value.addresses.length; count++){
            this.key_skill[count] = value.addresses[count].key_skill;  
      }
    

      for(let count = 0; count< this.key_skill.length; count++){
        if(this.key_skill[count]=="")
        {
          continue;
        }
        else{
                    let data={email:this.email, key_skill : this.key_skill[count]};  
                    console.log(data);
                      let link="http://animationcircle.com/AnimationCircle/add_key_skills&certifications.php"; 
                      this.http.post(link,data)
                          .map(res=>res.json())
                          .subscribe(data=>{
                                this.status=data.res[0].code;
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
    console.log('ionViewDidLoad KeySkillPage');
  }
ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
}
