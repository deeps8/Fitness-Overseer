import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {

  taskList;
  category=[
    {
      name:"exercise",
      color:"#4CAF50",
      cindex:1
    },
    {
      name:"resting",
      color:"#2196F3",
      cindex:2
    },
    {
      name:"skill",
      color:"#F44336",
      cindex:3
    },
    {
      name:"metime",
      color:"#795548",
      cindex:4
    },
    {
      name:"diet",
      color:"#673AB7",
      cindex:5
    },
    {
      name:"organise",
      color:"#f13c6d",
      cindex:6
    }
  ]
  constructor(private taskserv: TasksService,
              private router: Router) {
                this.taskserv.getUserTasks().subscribe(res=>{
                      if(res.message==='Task Found'){
                        //console.log(res.routine.tasks);
                        this.taskList=res.routine.tasks;
                        console.log("Alllist: ",this.taskList);
                      }else{
                        console.log(res.message);
                      }
                });
  }

  ngOnInit() {

  }

  setBgurl(index){
    return '../../assets/img/'+this.category[index-1].name+'.jpg';
  }

  setTime(time){
    const lt=moment(time).format('LT');
    return lt;
  }
}
