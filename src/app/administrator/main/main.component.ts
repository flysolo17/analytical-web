import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private questionService: QuestionService
  ) {}

  logout() {
    this.authService.logout().then(() => {
      alert('Successfully logout');
      this.router.navigate(['login']);
    });
  }
}
