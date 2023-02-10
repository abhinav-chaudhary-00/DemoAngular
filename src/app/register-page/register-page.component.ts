import { Component, OnInit } from '@angular/core';
import { UserDet } from '../model/register';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  userdetails!: UserDet;

  constructor() { }

  ngOnInit(): void {
    this.userdetails = new UserDet();
  }

  onsubmit() {
    console.log(this.userdetails);
  }

}
