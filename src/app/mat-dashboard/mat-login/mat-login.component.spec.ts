import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLoginComponent, MyErrorStateMatcher } from './mat-login.component';
import { AuthService } from '../../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MatLoginComponent', () => {
  let component: MatLoginComponent;
  let fixture: ComponentFixture<MatLoginComponent>;
  let authService: AuthService;
  let route: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
      declarations: [MatLoginComponent],
      providers: [AuthService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatLoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    route = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if username and password values are passed', () => {
    const usernInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#usern');
    const userpInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#userp');

    usernInput.value = 'abhinav';
    userpInput.value = '12345678';

    fixture.detectChanges();
    expect(component.username.nativeElement.value).toEqual('abhinav');
    expect(component.userpass.nativeElement.value).toEqual('12345678');
  });

  it('should disable login button when form is invalid', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#submitBtn');
    // expect(button.disabled).toBeTruthy();

    const usernameInput = fixture.debugElement.nativeElement.querySelector('#usern')
    const passwordInput = fixture.debugElement.nativeElement.querySelector('#userp')

    usernameInput.value = 'test';
    usernameInput.dispatchEvent(new Event('input'));

    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(button.disabled).toBeTruthy();

    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(button.disabled).toBeFalsy();
  });

  it('should call auth service validateUser method with correct arguments when form is submitted', () => {
    const authSpy = jest.spyOn(authService, 'validateUser').mockReturnValue(true);
    const form = component.loginForm;
    const userInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#usern');
    const passInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#userp')
    const submitBtn: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#submitBtn');
    userInput.value = 'test';
    userInput.dispatchEvent(new Event('input'));

    passInput.value = 'password';
    passInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // for (const controlName in form.controls) {
    //   const control = form.controls[controlName];
    //   if (control.errors) {
    //     console.log(`Validation errors for ${controlName}: ${JSON.stringify(control.errors)}`);
    //   }
    // }

    submitBtn.click();

    fixture.detectChanges();
    expect(authService.validateUser).toHaveBeenCalledWith('test', 'password');
  });

  it('should check weather loginForm in initialised', () => {
    const form: FormGroup = component.loginForm;
    expect(form).toBeTruthy();
    expect(form.controls['userFormControl']).toBeTruthy();
    expect(form.controls['passFormControl']).toBeTruthy();
  });

  it('should create MyErrorStateMatcher', () => {
    const matcher = component.matcher;
    expect(matcher instanceof MyErrorStateMatcher).toBe(true);
  });

  it('should check weather router.navigate method is called with correct methods', () => {
    const routerSpy = jest.spyOn(route, 'navigate');
    const authSpy = jest.spyOn(authService, 'validateUser').mockReturnValue(true);
    const user = 'abhinav';
    const userInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#usern');
    const passInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#userp')
    const submitBtn: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#submitBtn');
    const form = fixture.debugElement.nativeElement.querySelector('#loginform');

    userInput.value = user;
    userInput.dispatchEvent(new Event('input'));

    passInput.value = 'password';
    passInput.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));



    fixture.detectChanges();


    expect(route.navigate).toHaveBeenCalledWith(['matdash'], { state: { sname: user } });
  })
});
