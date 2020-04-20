import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  logo = '../../assets/icon/logo@2x.png';
  regform:FormGroup;
  constructor(private router: Router,
              private logserive: LoginService,
              private altctrl: AlertController) { }

  ngOnInit() {
    this.regform = new FormGroup({
      member: new FormControl(true),
      email : new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required,Validators.minLength(6)]),
      name: new FormControl('',[Validators.required,Validators.minLength(6)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

  register(rfrm){
    // console.log(rfrm.value);
    this.logserive.registerUser(rfrm.value).subscribe(res=>{
      if(res.message==='Account Created'){
        this.alertMsg('Now login',res.message,2);
        this.regform.reset();

      }else{
        this.alertMsg('Please try again',res.message,1);
        //this.regform.reset();
      }
    });
  }


  async alertMsg(msg:string,hdr:string,type:number) {
    if(type==1){
      const alert = await this.altctrl.create({
        header: hdr,
        message: msg,
        buttons: [
          {
            text: 'Okay',
            role: 'okay',
          }
        ]
      });
  
      await alert.present();
    }
    else if(type==2){
      const alert = await this.altctrl.create({
        header: hdr,
        message: msg,
        buttons: [
          {
            text: 'Login',
            handler:()=>{
                this.router.navigate(['/login']);
            }
          }
        ]
      });
  
      await alert.present();
    }
    
  }

}
