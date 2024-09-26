import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrls: ['./no-page.component.css'],
})
export class NoPageComponent implements OnInit {
  redirectPath: string = 'no-page';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const user = this.authService.getLoggedInUser();
    if (user.role === 'student') {
      this.redirectPath = 'student';
    } else {
      this.redirectPath = 'home';
    }
  }
}
