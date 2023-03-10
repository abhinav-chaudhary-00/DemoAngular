import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { studentDetails } from '../model/student.model';

@Component({
  selector: 'app-mat-dashboard',
  templateUrl: './mat-dashboard.component.html',
  styleUrls: ['./mat-dashboard.component.css']
})
export class MatDashboardComponent implements OnInit, AfterViewInit {

  private json_url: string = "assets/data.json";
  name: string = '';
  filterString: string = '';
  datasource: any;
  displayedColumns: string[] = ['rollno', 'sname', 'age', 'marks', 'branch'];
  students: studentDetails[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private _liveAnnouncer: any;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    // console.log(this.router.getCurrentNavigation().extras.state['sname']);
  }

  ngOnInit(): void {
    this.getJson().subscribe((data) => {
      this.students = data;
      this.datasource = new MatTableDataSource<studentDetails>(this.students);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;

    });
    this.name = this.activatedRoute.snapshot.params['username'];
  }

  ngAfterViewInit() {
  }

  getJson(): Observable<studentDetails[]> {
    return this.http.get<studentDetails[]>(this.json_url);
  }

  capitalize(name: string) {
    return this.name.toLocaleUpperCase();
  }

  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
