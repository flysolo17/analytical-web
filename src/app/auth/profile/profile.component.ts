import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Administrators } from '../../models/Administrator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  admin$: Administrators | null = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.administrator$.subscribe((data) => {
      this.admin$ = data;
      console.log(this.admin$);
    });
  }

  logout() {
    this.authService.logout();
  }
}
