import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page.component';
import { Router } from '@angular/router';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let route: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if onsubmit function is called on form submit', () => {
    const username: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#uname');
    const userpass: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#pswd');
    const form = fixture.debugElement.nativeElement.querySelector('#loginform');

    const submitSpy = jest.spyOn(component, 'onsubmit');

    username.value = 'admin';
    username.dispatchEvent(new Event('input'));

    userpass.value = '12345678';
    userpass.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(submitSpy).toHaveBeenCalled();

    username.value = 'abhinav';
    username.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(submitSpy).toHaveBeenCalled();

    expect(component.loginstatus).toBe(true);
    expect(component.errlogin).toBe(false);
  })

  it('should check if given invalid input function return message with error', () => {
    const username: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#uname');
    const userpass: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#pswd');
    const form = fixture.debugElement.nativeElement.querySelector('#loginform');
    const lform = component.loginform;

    const submitSpy = jest.spyOn(component, 'onsubmit');

    username.value = 'invalid';
    username.dispatchEvent(new Event('input'));

    userpass.value = 'invalidpassword';
    userpass.dispatchEvent(new Event('input'));


    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(submitSpy).toHaveBeenCalled();
    expect(component.loginstatus).toBe(false);
    expect(component.errlogin).toBe(true);
    expect(component.message).toEqual('No user found with entered credentials!')

  })
});
