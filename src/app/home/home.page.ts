import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { SurveyService } from '../services/survey.service';
import { Router } from '@angular/router';


// survey:true,
//         heartProblem:
    // highBP:
    // breathProblem:
    // smoker:
    // poorSleepingHabbit:
    // injury:
    // injuryDetails:[injury1,injury2]
    // sports:

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slides', {static: false}) slides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  sIndex = 0 ;
  name:string;
  surveyfrm: FormGroup;
  goalsName=[
    'Normal exercise and yoga training','Gym training','Professional training for any sports'
  ]
  sportsList=[
    'Archery',
    'Badminton',
    'Golf',
    'Football',
    'Cricket',
    'Bowling',
    'Boxing',
    'Curling',
    'Tennis',
    'Skateboarding',
    'Surfing',
    'Hockey',
    'Figure skating',
    'Yoga',
    'Fencing',
    'Fitness',
    'Gymnastics',
    'Karate',
    'Volleyball',
    'Weightlifting',
    'Basketball',
    'Baseball',
    'Rugby',
    'Wrestling',
    'High jumping',
    'Hang gliding',
    'Car racing',
    'Cycling',
    'Running',
    'Table tennis',
    'Fishing',
    'Judo',
    'Climbing',
    'Billiards',
    'Shooting',
    'Horse racing',
    'Horseback riding'
  ];
  
  constructor(private altctrl: AlertController,
              private surservice: SurveyService,
              private toast: ToastController,
              private router: Router ) {
    this.name=localStorage.getItem('name');
  }

  ngOnInit(){
    this.surveyfrm = new FormGroup({
      survey : new FormControl(true),
      height: new FormControl('',[Validators.required]),
      weight: new FormControl('',[Validators.required]),
      agegrp: new FormControl('2',[Validators.required]),
      heart: new FormControl(false),
      highBP: new FormControl(false),
      brthPrb: new FormControl(false),
      smoker: new FormControl(false),
      poorsleep: new FormControl(false),
      injury: new FormControl(false),
      injuryDetails: new FormControl('',[Validators.required,Validators.minLength(10)]),
      sports: new FormControl('',[]),
      goal: new FormControl('1',[Validators.required]),
    });
  }

  subSurvey(sfrm){

  
    //create an object for request data.
    const surDetails = new Object({
        survey : sfrm.value.survey,
        agegrp : sfrm.value.agegrp,
        height : sfrm.value.height,
        weight : sfrm.value.weight,
        questions: {
          heartProblem  : sfrm.value.heart,
          highBP        : sfrm.value.highBP,
          breathProblem : sfrm.value.brthPrb,
          smoker        : sfrm.value.smoker,
          injury        : sfrm.value.injury,
          poorSleepingHabbit       : sfrm.value.poorsleep,
          injuryDetails       : sfrm.value.injuryDetails,
          sports         : sfrm.value.sports,
          goal           :{
            name : this.goalsName[sfrm.value.goal-1],
            gindex : sfrm.value.goal
          }
        }
    });

    //console.log(surDetails);
    this.surservice.submitSurvey(surDetails).subscribe(res=>{
      if(res.message === 'Survey Completed'){
        this.toastMsg('Survey Completed');
        localStorage.setItem('survey','true');
        this.router.navigate(['/tasks']);
      }else{
        this.alertMsg('Check survey details',res.message,1);
      }
    });
  }


  slideIndex() {
    this.slides.getActiveIndex().then(index => {
      this.sIndex = index;
    });

  }

  nextSlide() {
    if(this.surveyfrm.get('height').hasError('required') || this.surveyfrm.get('weight').hasError('required')){
      this.alertMsg('Please enter Height and Weight','Incomplete Survey',1);
    }else{
     this.slides.slideNext();
    }
  }

  prevSlide() {
    this.slides.slidePrev();
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
        duration: 2000
      });
  
      await tst.present();
  }

}
