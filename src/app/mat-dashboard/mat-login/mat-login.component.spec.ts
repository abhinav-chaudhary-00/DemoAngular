import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLoginComponent } from './mat-login.component';

describe('MatLoginComponent', () => {
  let component: MatLoginComponent;
  let fixture: ComponentFixture<MatLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
