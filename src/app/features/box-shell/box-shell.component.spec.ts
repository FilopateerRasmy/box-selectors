import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxShellComponent } from './box-shell.component';

describe('BoxShellComponent', () => {
  let component: BoxShellComponent;
  let fixture: ComponentFixture<BoxShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
