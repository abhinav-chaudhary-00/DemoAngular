import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface studentDetails {
  sname: string;
  rollno: number;
  branch: string;
  marks: number;
  age: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private json_url: string = "assets/data.json";
  name!: String;
  students!: studentDetails[];
  order: boolean = false;



  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.students = data;
    })
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.json_url);
  }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params["uname"];
  }

  sortData() {
    if (this.order) {
      let newarr = this.students.sort((a, b) => a.rollno - b.rollno);
      this.students = newarr;
    } else {
      let newarr = this.students.sort((a, b) => b.rollno - a.rollno);
      this.students = newarr;
    }
    this.order = !this.order;
  }


}
