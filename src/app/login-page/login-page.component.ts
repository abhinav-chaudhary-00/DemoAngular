import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginDet {
  uname: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  logindetails!: LoginDet;
  @ViewChild('loginForm') loginform!: NgForm;
  message!: String;
  errlogin: boolean = false;
  loginstatus: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.logindetails = {
      uname: "",
      password: ""
    }
  }

  onsubmit() {
    if (this.logindetails.uname == "admin" && this.logindetails.password == "12345678") {
      this.router.navigate(['/dashboard', this.logindetails.uname]);
      this.loginstatus = true;
    } else if (this.logindetails.uname == "abhinav" && this.logindetails.password == "12345678") {
      this.router.navigate(['/dashboard', this.logindetails.uname]);
      this.loginstatus = true;
    }
    else {
      this.errlogin = true;
      this.loginstatus = false;
      this.message = "No user found with entered credentials!"
    }
  }
}
