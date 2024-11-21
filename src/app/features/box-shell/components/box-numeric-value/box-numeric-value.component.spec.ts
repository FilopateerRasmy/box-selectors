import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxNumericValueComponent } from './box-numeric-value.component';

describe('BoxNumericValueComponent', () => {
  let component: BoxNumericValueComponent;
  let fixture: ComponentFixture<BoxNumericValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxNumericValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxNumericValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
