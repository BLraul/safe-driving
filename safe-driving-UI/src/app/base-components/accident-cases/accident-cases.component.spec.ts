import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentCasesComponent } from './accident-cases.component';

describe('AccidentCasesComponent', () => {
  let component: AccidentCasesComponent;
  let fixture: ComponentFixture<AccidentCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccidentCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
