import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log("helloagain")
    console.log(usern + " " + userp);
    if (usern == 'abhinav' && userp == '12345678') {
      res = true;
    } else if (usern == 'admin' && userp == '12345678') {
      res = true;
    } else {
      res = false;
    }


    console.log("i worked fine " + res)
    return res;

  }

}
