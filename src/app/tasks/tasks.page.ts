import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  curTime: any;
  curDate: any;
  curDay: any;
  tid = '259';
  constructor() {
  }

  ngOnInit() {

    const numbers = timer(0, 1000);
    numbers.subscribe(x => {
      this.curTime = moment().format('LT');
      this.curDate = moment().format('D');
      this.curDay = moment().format('dddd');
    } );
    this.addTask();
  }

  addTask() {
    // starting pixel of list is 8px (top)
    // height for AM  = ((time-1) * 49) + 8 ;
    // height for PM  = ((time + 12 - 1) * 49) + 8 ;
    // height for 12PM  = ((time-1) * 49) + 8 ; same as AM
    // height for 12AM  = ((time + 12 -1) * 49) + 8 ; same as PM {task height will be of 49px only}

    const height = (7 * 49) + 8;
    const top = height + 'px';
    const th = 2 * 49 + 'px';
    const taskname = 'Work Out';
    const d = document.getElementById('timelist');
    // tslint:disable-next-line: max-line-length
    d.insertAdjacentHTML('afterend', '<div id="' + this.tid + '"class="task" ' + 'style="top: ' + top + ';height:' + th + ';">' + taskname + '</div>');
  }

}
