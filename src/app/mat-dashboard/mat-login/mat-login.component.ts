import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-mat-login',
  templateUrl: './mat-login.component.html',
  styleUrls: ['./mat-login.component.css']
})
export class MatLoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup = this.formbuilder.group({
    userFormControl: new FormControl('', [Validators.required]),
    passFormControl: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
  })

  get frmlogin() { return this.loginForm.controls; }


  matcher = new MyErrorStateMatcher();

  @ViewChild('usern') username!: ElementRef;
  @ViewChild('userp') userpass!: ElementRef;

  constructor(private auth: AuthService, private router: Router, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  loginUser(event: Event) {
    event.preventDefault();
    // this.auth.validateUser(username, pswd).subscribe(data => {
    //   console.log(data)
    //   navigate to some other route (like dashboard)
    // })
    if (this.auth.validateUser(this.username.nativeElement.value, this.userpass.nativeElement.value)) {

      // this.router.navigate(['matdash', this.username.nativeElement.value]);

      this.router.navigate(['matdash'], {
        state: { sname: this.username.nativeElement.value }
      })


    }
  }

}
