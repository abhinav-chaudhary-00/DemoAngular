import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { studentDetails } from '../model/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpMock: HttpTestingController;
  let mockRouter;

  const studentsMock: studentDetails[] = [
    { sname: 'bob', rollno: 12, age: 22, branch: 'CSE', marks: 99 },
    { sname: 'alice', rollno: 13, age: 20, branch: 'IT', marks: 98 }
  ]

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [DashboardComponent],
      providers: [
        {
          provide: HttpClient,
          userValue: {
            get: jest.fn(() => { studentsMock })
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { uname: 'john' } }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   httpMock.verify();
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from JSON file', () => {
    const req = httpMock.expectOne('assets/data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(studentsMock);
  });

  it('should sort data based on columns', () => {
    const sortDataSpy = jest.spyOn(component, 'sortData')
    const sortedStudentsMock = [
      { sname: 'alice', rollno: 13, age: 20, branch: 'IT', marks: 98 },
      { sname: 'bob', rollno: 12, age: 22, branch: 'CSE', marks: 99 }

    ];
    jest.spyOn(component, 'getJSON').mockReturnValue(of(studentsMock));
    component.ngOnInit();
    component.sortData('rollno');
    expect(sortDataSpy).toHaveBeenCalledWith('rollno');
    expect(component.students).toEqual(sortedStudentsMock);
  })

  it('should check if students details are being fetched', () => {
    const getSpy = jest.spyOn(component, 'getJSON').mockReturnValue(of(studentsMock));
    component.ngOnInit();
    const pageLimitChangeSpy = jest.spyOn(component, 'pageLimitChange');
    expect(component.students).toEqual(studentsMock);
    expect(component.studentsOriginal).toEqual(studentsMock);
    // expect(pageLimitChangeSpy).toHaveBeenCalled();
    getSpy.mockRestore();
  });

  it('should check if search if working properly', () => {
    const searchSpy = jest.spyOn(component, 'searchData');
    const getSpy = jest.spyOn(component, 'getJSON').mockReturnValue(of(studentsMock));
    const inputElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#searchString');
    component.ngOnInit();
    component.searchText = 'alice'
    component.searchData();
    expect(searchSpy).toHaveBeenCalled();
    expect(component.students.length).toEqual(1);

  });

  it('should check if page limit changes if student details are added', () => {

    const limitSpy = jest.spyOn(component, 'pageLimitChange');
    component.students = [];
    component.pageLimitChange();
    expect(component.pageDivision).toEqual(1);
    expect(component.entries).toEqual([0]);

    component.students = studentsMock;
    component.pageLimit = 1;
    component.pageLimitChange();

    expect(component.pageDivision).toEqual(2);
    expect(component.entries).toEqual([0, 1]);
    limitSpy.mockRestore();
  });

  // it('should change pagelimit when input value changes', () => {
  //   const input = fixture.debugElement.nativeElement.querySelector('#pagelimit');
  //   input.value = 5;
  //   input.dispatchEvent(new Event('change'));
  //   input.

  // })

  it('should set name based on activated route snapshot', () => {
    expect(component.name).toEqual('john');
  });

  it('should check if page is changed on accurate index', () => {
    const changeSpy = jest.spyOn(component, 'changeLimit');
    component.studentsOriginal.length = 26;
    component.pageLimit = 5;
    component.changePage(5);
    expect(component.start).toEqual(25);

  });

  it('should check if previous and next page works fine', () => {
    const changeSpy = jest.spyOn(component, 'changePage');
    component.pageDivision = 5;

    component.selectedIndex = 0;
    component.previousPage();
    expect(changeSpy).not.toHaveBeenCalled();
    component.selectedIndex = component.pageDivision - 1;
    component.nextPage();
    expect(changeSpy).not.toHaveBeenCalled();
    component.selectedIndex = 2;
    component.previousPage();
    expect(changeSpy).toHaveBeenCalledWith(1);


    component.selectedIndex = 2;
    component.nextPage();
    expect(changeSpy).toHaveBeenCalledWith(3)

  })

});
