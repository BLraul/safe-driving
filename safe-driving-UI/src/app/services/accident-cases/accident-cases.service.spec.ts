import { TestBed } from '@angular/core/testing';

import { AccidentCasesService } from './accident-cases.service';

describe('AccidentCasesService', () => {
  let service: AccidentCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccidentCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
