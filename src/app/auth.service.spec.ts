import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate correct users', () => {
    const username = 'abhinav';
    const userpass = '12345678';


    expect(service.validateUser(username, userpass)).toBe(true);

    expect(service.validateUser('admin', userpass)).toBe(true);

    expect(service.validateUser("username", "userpass")).toBe(false);

  })
});
