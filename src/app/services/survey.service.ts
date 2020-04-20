import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  surveyURL='http://localhost:3000/survey/submit';
  httpOptions;  
  constructor(private http: HttpClient) { }


  submitSurvey(surDetails){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
     
    return <any>this.http.post(this.surveyURL,surDetails,this.httpOptions);
  }
}
