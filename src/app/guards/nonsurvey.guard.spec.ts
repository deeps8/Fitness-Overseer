import { TestBed, async, inject } from '@angular/core/testing';

import { NonsurveyGuard } from './nonsurvey.guard';

describe('NonsurveyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonsurveyGuard]
    });
  });

  it('should ...', inject([NonsurveyGuard], (guard: NonsurveyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
