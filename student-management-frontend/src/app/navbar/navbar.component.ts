import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  redirectPath: string = 'home';
  constructor(private authservice: AuthService, private router: Router) {}
  logoutUser() {
    console.log('logged out');
    this.authservice.logoutUser();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    const user = this.authservice.getLoggedInUser();
    if (user.role === 'student') {
      this.redirectPath = 'student';
    } else {
      this.redirectPath = 'home';
    }
  }
}
