import { TestBed } from '@angular/core/testing';

import { UsersetingsService } from './usersetings.service';

describe('UsersetingsService', () => {
  let service: UsersetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
