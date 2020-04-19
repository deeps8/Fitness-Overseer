import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegTrainerPage } from './reg-trainer.page';

describe('RegTrainerPage', () => {
  let component: RegTrainerPage;
  let fixture: ComponentFixture<RegTrainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegTrainerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegTrainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
