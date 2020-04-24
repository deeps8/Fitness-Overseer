import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sharedData:any;
  constructor() { }

  getdata(){
    return this.sharedData;
  }

  setdata(value){
    this.sharedData=value;
  }

}
