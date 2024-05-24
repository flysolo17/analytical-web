import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Quiz } from '../../models/Quiz';
import { QuizService } from '../../services/quiz.service';
import { CreateQuizComponent } from '../create-quiz/create-quiz.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  private modalService = inject(NgbModal);
  quizSub$: Subscription;
  quizzes$: Quiz[] = [];
  constructor(private quizService: QuizService) {
    this.quizSub$ = new Subscription();
  }
  ngOnInit(): void {
    this.quizSub$ = this.quizService.getAllQuiz().subscribe((data) => {
      this.quizzes$ = data;
      console.log(this.quizzes$);
    });
  }

  createQuiz() {
    const modalRef = this.modalService.open(CreateQuizComponent);
  }
}
