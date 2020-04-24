import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  addTaskURL='http://localhost:3000/routine/add';
  userTasksURL='http://localhost:3000/routine/user/tasks';
  singleTaskURL='http://localhost:3000/routine/task/';
  httpOptions;  
  constructor(private http: HttpClient) { }


  addTasks(taskdetails){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
     
    return <any>this.http.post(this.addTaskURL,taskdetails,this.httpOptions);
  }

  getUserTasks(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
     
    return <any>this.http.get(this.userTasksURL,this.httpOptions);
  }


  getSingleTask(tid){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
     
    return <any>this.http.get(this.singleTaskURL+tid,this.httpOptions);
  }
}
