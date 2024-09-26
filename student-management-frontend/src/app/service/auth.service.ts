import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  validateUser(username: string, password: string, role: string) {
    let url = `http://localhost:3000/users?username=${username}&password=${password}&role=${role}`;
    return this.http.get(url);
  }
  persistUser(userObj: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(userObj));
  }
  isUserLoggedIn() {
    const userJSON = localStorage.getItem('loggedInUser');
    if (userJSON) {
      try {
        JSON.parse(userJSON);
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  }
  getLoggedInUser() {
    if (this.isUserLoggedIn()) {
      const userJSON: any = localStorage.getItem('loggedInUser');
      return JSON.parse(userJSON);
    }
    return null;
  }
  logoutUser() {
    localStorage.removeItem('loggedInUser');
    localStorage.clear();
  }
}
