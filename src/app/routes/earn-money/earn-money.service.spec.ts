/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EarnMoneyService } from './earn-money.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: EarnMoney', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EarnMoneyService]
    });
  });

  it('should ...', inject([EarnMoneyService], (service: EarnMoneyService) => {
    expect(service).toBeTruthy();
  }));
});
