import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { timer } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  curTime: any;
  curDate: any;
  curDay: any;
  taskList;
  sendTask=[];
  constructor(private taskserv: TasksService,
              private router: Router) {
    
    
    // this.getCaltime(this.taskList[0].start);

  }

  ngOnInit() {

    this.taskserv.getUserTasks().subscribe(res=>{
      if(res.message==='Task Found'){
        this.taskList=res.routine.tasks;
          

          for(var i=0;i<this.taskList.length;i++){
            this.sendTask[i] = this.addTask(this.taskList[i]);
          }

          
      }else{
        console.log(res.message);
      }
    });


    const numbers = timer(0, 1000);
    numbers.subscribe(x => {
      this.curTime = moment().format('LT');
      this.curDate = moment().format('D');
      this.curDay = moment().format('dddd');
    } );
    
  }

  addTask(task) {
    // starting pixel of list is 8px (top)
    // height for AM  = ((time-1) * 49) + 8 ;
    // height for PM  = ((time + 12 - 1) * 49) + 8 ;
    // height for 12PM  = ((time-1) * 49) + 8 ; same as AM
    // height for 12AM  = ((time + 12 -1) * 49) + 8 ; same as PM {task height will be of 49px only}

    var st=this.getCaltime(task.start);
    var et=this.getCaltime(task.end);
    
    const height = (st * 49);
    const top = height + 'px';
    const th = (et-st) * 49 + 'px';
    const taskname = task.title;
    const color = task.category.color;

    const position = new Object({
      top:top,
      height:th,
      task:task
    });
    
    return position;
  }

  getCaltime(stime){
    var st = moment(stime).format('LT').split(' ');
    var time=st[0].split(':');

    var t1=parseInt(time[0]);
    var t2=parseFloat(time[1]);
    t2=parseFloat((t2/60).toPrecision(2));
    
    var total;
    if(st[1]==='AM'){
        if(t1===12)
          t1=t1+12;
      total=t1+t2-1;    
    }else{
      total=t1+t2+12-1;    
      if(t1==12)
        total=total-12;
    } 

    //console.log(total);
    return (total);
  }

  openTask(id){
    this.router.navigate(['/tasks','single',id]);
  }

}
