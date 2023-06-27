import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentCasesMenuComponent } from './accident-cases-menu.component';

describe('AccidentCasesMenuComponent', () => {
  let component: AccidentCasesMenuComponent;
  let fixture: ComponentFixture<AccidentCasesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccidentCasesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentCasesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
