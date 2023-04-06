import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { studentDetails } from '../model/student.model';

@Component({
  selector: 'app-mat-dashboard',
  templateUrl: './mat-dashboard.component.html',
  styleUrls: ['./mat-dashboard.component.css']
})
export class MatDashboardComponent implements OnInit, AfterViewInit {

  private readonly json_url: string = "assets/data.json";
  name: string = '';
  filterString: string = '';
  studentLength: number = 0;
  datasource: any = null;
  displayedColumns: string[] = ['rollno', 'sname', 'age', 'marks', 'branch'];
  students: studentDetails[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const { sname } = this.router.getCurrentNavigation()?.extras.state ?? {};
    this.name = typeof sname === 'string' ? sname.toUpperCase() : 'USER';
  }

  ngOnInit(): void {

    this.getJson().subscribe((students) => {
      this.students = students;
      this.studentLength = this.students.length;
      this.datasource = new MatTableDataSource<studentDetails>(this.students);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;

      // this.sort.sortChange.pipe(
      //   map(({active, direction}) => ({active, direction: direction || 'desc'}))
      // ).subscribe((sortState) => {
      //   this.datasource!.sort.sort(sortState);
      // })

      const sortState: Sort = { active: 'sname', direction: 'desc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);

      // console.log(this.sort.sortables)
    });
  }

  ngAfterViewInit() {
  }

  getJson(): Observable<studentDetails[]> {
    return this.http.get<studentDetails[]>(this.json_url);
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
    this.filterString = filterValue;

    if (this.datasource) {
      this.datasource.filter = filterValue.trim().toLowerCase();
    }
  }
}
