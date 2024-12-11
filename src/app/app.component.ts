import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'analytical';
  auth = inject(Auth);

  constructor(private authService: AuthService, private router: Router) {}

  getAdminInfo(email: string) {
    this.authService.listenToAdmin(email).subscribe((data) => {
      this.authService.setAdmin(data);
      if (data !== null) {
        this.router.navigate(['main']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
