import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageMapsComponent } from './coverage-maps.component';

describe('CoverageMapsComponent', () => {
  let component: CoverageMapsComponent;
  let fixture: ComponentFixture<CoverageMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverageMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
