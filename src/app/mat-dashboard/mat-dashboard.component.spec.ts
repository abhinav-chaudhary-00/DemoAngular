import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material/material.module';
import { MatDashboardComponent } from './mat-dashboard.component';
import { of } from 'rxjs';
import { studentDetails } from '../model/student.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

describe('MatDashboardComponent', () => {
  let component: MatDashboardComponent;
  let fixture: ComponentFixture<MatDashboardComponent>;
  let httpMock: HttpClient;

  const studentsMock: studentDetails[] = [
    {
      "rollno": 1,
      "sname": "John",
      "age": 21,
      "marks": 85,
      "branch": "CSE"
    },
    {
      "rollno": 2,
      "sname": "Alice",
      "age": 22,
      "marks": 80,
      "branch": "CSE"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        NoopAnimationsModule
      ],   // router testing module for activated route
      declarations: [MatDashboardComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn().mockReturnValue(of(studentsMock))
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass filtering input to the typescript file', () => {
    fixture.detectChanges();
    const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#filterinput');
    element.value = "Abhinav";
    element.dispatchEvent(new Event('keyup'));
    expect(component.filterString).toEqual("Abhinav");
  });

  it('should set name based on router state', () => {
    const routerState = { extras: { state: { sname: 'abhinav' } } } as any;
    const routerSpy = jest.spyOn(component['router'], 'getCurrentNavigation').mockReturnValue(routerState);
    fixture = TestBed.createComponent(MatDashboardComponent);
    component = fixture.componentInstance;
    expect(component.name).toEqual("ABHINAV");
    routerSpy.mockRestore();
  });

  it('should set USER to name if router state is not set', () => {
    const routerSpy = jest.spyOn(component['router'], 'getCurrentNavigation').mockReturnValue(null);
    fixture = TestBed.createComponent(MatDashboardComponent);
    component = fixture.componentInstance;
    expect(component.name).toEqual('USER');
    routerSpy.mockRestore();
  });

  it('should fetch students data from JSON file', () => {
    const dataSpy = jest.spyOn(component, 'getJson').mockReturnValue(of(studentsMock));
    component.ngOnInit();
    expect(component.students).toEqual(studentsMock);
    expect(component.studentLength).toEqual(studentsMock.length);
  });

  it('should create the datasource and set paginator and sort', () => {
    httpMock = TestBed.inject(HttpClient);
    expect(component.datasource).toBeTruthy();
    expect(component.datasource.data).toEqual(studentsMock);
    expect(component.paginator).toBeTruthy();
    expect(component.sort).toBeTruthy();
  });

  it('should check if filter is working as expected or not ', () => {
    component.students = studentsMock;
    component.datasource = new MatTableDataSource(studentsMock);
    fixture.detectChanges();
    const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#filterinput')
    element.value = "Alice";
    element.dispatchEvent(new Event('keyup'));
    expect(component.filterString).toEqual("Alice");
    expect(component.datasource.filteredData.length).toEqual(1);
  });

  it('should get student data on Init', () => {
    expect(component.students).toEqual(studentsMock);
  });


});
