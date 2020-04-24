import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import * as moment from 'moment';


@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
  taskid;
  taskdetails:any;
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

  constructor(private activeroute: ActivatedRoute,
              private taskserv: TasksService) {
        this.taskid=this.activeroute.snapshot.paramMap.get('id');
        
        this.taskserv.getSingleTask(this.taskid).subscribe(res=>{
          if(res.message==="Task Found" && res.result.tasks.length==1){
                this.taskdetails=res.result.tasks;
          }else{
              console.log(res);
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
  
  setDays(days){
    if(days.length===7){
      return "Every Day";
    }else if(days.length===1){
      return "One Day a Week";
    }else{
      return  days.length+" Days a week";
    }
  }

  calTP(time){
      var hr,min;
      if((time/60)<1){
        hr='';
      }else
        hr=(time/60)+" Hour ";
      min=time%60;
      if(min!=0)
        min=min+" Minutes ";
      else  
        min="";    
      
      return hr+min;
  }

}
