import { TestBed } from '@angular/core/testing';

import { PositionZoomService } from './position-zoom.service';

describe('PositionZoomService', () => {
  let service: PositionZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionZoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
