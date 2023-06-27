import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentDetailsGraphicsComponent } from './accident-details-graphics.component';

describe('AccidentDetailsGraphicsComponent', () => {
  let component: AccidentDetailsGraphicsComponent;
  let fixture: ComponentFixture<AccidentDetailsGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccidentDetailsGraphicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentDetailsGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
