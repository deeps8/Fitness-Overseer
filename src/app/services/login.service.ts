import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginurl: string = 'http://localhost:3000/user/login';
  signupurl: string = 'http://localhost:3000/user/signup';
  userDetails:any;
  constructor(private http: HttpClient,
              private router: Router ) {

  }
  
  httpOptions;

  loginUser(userdata){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
    return <any>this.http.post(this.loginurl,userdata,this.httpOptions);
  }

  registerUser(userdata){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
    return <any>this.http.post(this.signupurl,userdata,this.httpOptions);
  }

  logStatus(){
    return !!localStorage.getItem('token');
  }

  surveyStatus(){
    return localStorage.getItem('survey');
  }

  memberStatus(){
    return localStorage.getItem('member');
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('survey');
    localStorage.removeItem('member');
    this.router.navigate(['/login']);
  }
}
