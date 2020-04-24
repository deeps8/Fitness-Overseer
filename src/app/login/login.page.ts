import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logo = '../../assets/icon/logo@2x.png';
  loginfrm: FormGroup;
  constructor(private loginserve: LoginService,
              private router: Router,
              public altctrl: AlertController) { }

  ngOnInit() {
    this.loginfrm=new FormGroup({
      username: new FormControl('',[Validators.required,Validators.minLength(5)]),
      password: new FormControl('',[Validators.required,Validators.minLength(5)])
    });
  }



  login(lfrm){
    this.loginserve.loginUser(lfrm.value).subscribe(res=>{
      if(res.message ==='Authentication Failed'){
        this.alertMsg('Please try again!!',res.message,1);
        this.loginfrm.reset();
      }else{
        //storing to localStorage
        localStorage.setItem('token',res.token);
        localStorage.setItem('name',res.user.username);
        localStorage.setItem('survey',res.user.survey);
        localStorage.setItem('member',res.user.member);

        this.loginserve.userDetails = res.user;
        this.loginfrm.reset();
        // navigating to home page (gaurds will redirect to perticular page on Survey value)
        this.router.navigate(['/home']);
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
  }

}
