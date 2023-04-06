import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { studentDetails } from '../model/student.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private json_url: string = "assets/data.json";
  name!: String;
  students: studentDetails[] = [];
  studentsOriginal: studentDetails[] = [];
  order: boolean = false;
  searchText: any = "";
  pageLimits: number[] = [5, 10, 15, 25];
  pageLimit: number = 50;
  pageDivision!: number;
  entries: number[] = [];
  selectedIndex: number = 0;
  start: number = 0;


  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get<studentDetails[]>(this.json_url);
  }

  ngOnInit(): void {
    this.getJSON().subscribe(data => {
      this.students = data;
      this.studentsOriginal = data;

    })
    this.students = this.studentsOriginal;
    this.pageLimitChange();
    this.name = this.activatedRoute.snapshot.params["uname"];
  }


  sortData(formcolumn: string) {
    if (formcolumn == 'rollno' || formcolumn == 'marks') {
      if (this.order) {
        let newarr = this.students.sort((a, b) => a[formcolumn] - b[formcolumn]);
        this.students = newarr;
      } else {
        let newarr = this.students.sort((a, b) => b[formcolumn] - a[formcolumn]);
        this.students = newarr;
      }
      this.order = !this.order;
    } else {
      if (this.order) {
        let newarr = this.students.sort((a, b) => String(a[formcolumn as keyof studentDetails]).localeCompare(String(b[formcolumn as keyof studentDetails])));
        this.students = newarr;
      } else {
        let newarr = this.students.sort((a, b) => String(b[formcolumn as keyof studentDetails]).localeCompare(String(a[formcolumn as keyof studentDetails])));
        this.students = newarr;
      }
      this.order = !this.order;
    }

  }

  searchData() {
    if (this.searchText == "") {
      this.ngOnInit();
    } else {
      this.pageLimitChange();
      this.selectedIndex = 0;
      this.students = this.students.filter((val) => {
        if (val.rollno.toLocaleString().includes(this.searchText.toLowerCase()) ||
          val.sname.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.marks.toLocaleString().includes(this.searchText.toLowerCase()) ||
          val.age.toLocaleString().includes(this.searchText.toLowerCase()) ||
          val.branch.toLowerCase().includes(this.searchText.toLowerCase()))
          return true;
        else
          return false;
        // return val.sname.toLowerCase().includes(this.searchText.toLowerCase());
      })
    }
  }

  pageLimitChange() {
    if (this.students.length == 0) {
      this.pageDivision = 1;
      this.entries = [0];
    } else {
      this.pageDivision = Math.ceil(this.students.length / (this.pageLimit > this.students.length ? this.students.length : this.pageLimit));
      this.entries = Array(this.pageDivision).fill(0).map((x, i) => i);
    }
  }


  changeLimit(event: Event) {
    this.pageLimit = Number((<HTMLInputElement>event.target).value);
    this.ngOnInit();
  }

  changePage(n: number) {
    this.start = this.pageLimit * n;
    this.selectedIndex = n;
  }

  previousPage() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.changePage(this.selectedIndex)
    }
  }

  nextPage() {
    if (this.selectedIndex < this.pageDivision - 1) {
      this.selectedIndex++;
      this.changePage(this.selectedIndex)
    }
  }



}
