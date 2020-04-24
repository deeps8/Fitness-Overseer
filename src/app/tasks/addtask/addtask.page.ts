import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.page.html',
  styleUrls: ['./addtask.page.scss'],
})
export class AddtaskPage implements OnInit {
  
  taskform: FormGroup;
  category=[
    {
      name:"Exercise",
      color:"#4CAF50",
      cindex:1
    },
    {
      name:"Resting time",
      color:"#2196F3",
      cindex:2
    },
    {
      name:"Build a skill",
      color:"#F44336",
      cindex:3
    },
    {
      name:"Me time",
      color:"#795548",
      cindex:4
    },
    {
      name:"Diet plan",
      color:"#673AB7",
      cindex:5
    },
    {
      name:"Organise my life",
      color:"#f13c6d",
      cindex:6
    }
  ]
  days=["monday"];
  
  constructor(private altctrl: AlertController,
              private taskserv: TasksService,
              private router: Router,
              private toast: ToastController) { }


  ngOnInit() {
    this.taskform = new FormGroup({
      category : new FormControl(1,[Validators.required]),
      title : new FormControl('',[Validators.required]),
      detailed : new FormControl('',[Validators.required]),
      days : new FormControl(["monday"],[Validators.required]),
      start : new FormControl('08:00:46.789',[Validators.required]),
      end : new FormControl('09:00:46.789',[Validators.required]),
      reminder : new FormControl('10',[Validators.required])
    });
  }

  addTask(tskfrm){
  
    // Setting the days array according to input.
    var ds;
    if(tskfrm.days==='everyday'){
      ds=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    }else if(tskfrm.days==='today'){
      ds=[moment().format('dddd')];
    }else{
      ds=tskfrm.days;
    }

    // Calculating time period between start and end time.
    var tp;
    var s=moment(tskfrm.start);
    var e=moment(tskfrm.end);
    tp=e.diff(s,'minutes');

    // Calculating Reminder time.
    var rt=e.subtract(tskfrm.reminder,'minutes').toISOString(true);
    
    const taskDetails = new Object({
      category:{
        name:this.category[tskfrm.category-1].name,
        color:this.category[tskfrm.category-1].color,
        cindex:tskfrm.category
      },
      title:tskfrm.title,
      detailed:tskfrm.detailed,
      days:ds,
      start:tskfrm.start,
      end:tskfrm.end,
      timePeriod:tp,
      reminder:{
        rtime:rt,
        before:tskfrm.reminder
      }
    });
    console.log(taskDetails);
    // Subscribing to the service
    this.taskserv.addTasks(taskDetails).subscribe(res=>{
        if(res.message==='Task Added'){
          console.log(res);
          this.toastMsg(res.message);
          this.router.navigate(['/tasks']);
        }else{
          this.alertMsg('Please try again',res.message,1);
        }
    });
  }

  checkDays(){
    
    if(this.taskform.value.days.includes("everyday")){
      this.taskform.controls.days.setValue('');
      this.taskform.controls.days.setValue('everyday');
    }
    else if(this.taskform.value.days.includes("today")){
      this.taskform.controls.days.setValue('');
      this.taskform.controls.days.setValue('today');
    }
    console.log(this.taskform.value.days);
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

  async toastMsg(msg:string) {
      const tst = await this.toast.create({
        message: msg,
        duration: 6000
      });
  
      await tst.present();
  }

}
