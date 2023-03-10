import { Component, OnInit } from '@angular/core';
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
  message!: String;
  errlogin: boolean = false;
  loginstatus: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("entered loginpage")
    this.logindetails = {
      uname: "",
      password: ""
    }
  }

  onsubmit() {
    console.log(this.logindetails);
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
