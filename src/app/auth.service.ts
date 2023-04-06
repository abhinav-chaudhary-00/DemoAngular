import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validateUser(usern: string, userp: string) {

    // return this.http.post('some/useful/api', { username, password }).subscribe(data => 
    //   {
    //     console.log(data)
    //   })
    let res: boolean;

    if (usern == 'abhinav' && userp == '12345678') {
      res = true;
    } else if (usern == 'admin' && userp == '12345678') {
      res = true;
    } else {
      res = false;
    }
    return res;

  }

}
