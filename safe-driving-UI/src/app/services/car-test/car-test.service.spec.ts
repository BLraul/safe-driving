import { TestBed } from '@angular/core/testing';

import { CarTestService } from './car-test.service';

describe('CarTestService', () => {
  let service: CarTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
