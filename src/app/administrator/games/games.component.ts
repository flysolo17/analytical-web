import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, map } from 'rxjs';

import { QuizService } from '../../services/quiz.service';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuestionService } from '../../services/question.service';
import { ToastrService } from 'ngx-toastr';
import { Administrators } from '../../models/Administrator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  private modalService = inject(NgbModal);
  quiz$ = this.quizService.getAllQuiz();
  riddles$ = this.quiz$.pipe(
    map(
      (quizzes) => quizzes.filter((quiz) => quiz.category === 'RIDDLES').length
    )
  );
  wordPuzzle$ = this.quiz$.pipe(
    map(
      (quizzes) =>
        quizzes.filter((quiz) => quiz.category === 'WORD_PUZZLE').length
    )
  );
  rebus$ = this.quiz$.pipe(
    map(
      (quizzes) =>
        quizzes.filter((quiz) => quiz.category === 'REBUS_PUZZLE').length
    )
  );
  mathLogic$ = this.quiz$.pipe(
    map(
      (quizzes) =>
        quizzes.filter((quiz) => quiz.category === 'MATH_LOGIC_PUZZLE').length
    )
  );
  admin$: Administrators | null = null;
  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.administrator$.subscribe((data) => {
      this.admin$ = data;
    });
  }

  createQuiz() {
    const modalRef = this.modalService.open(CreateQuizComponent, {
      size: 'lg',
    });
    modalRef.result.then((data: string | null) => {
      if (data !== null) {
        this.viewGame(data);
      }
    });
  }

  viewGame(id: string) {
    this.router.navigate(['main/games/view', id]);
  }

  // quizSize(type: Quiz['category']): Observable<number> {
  //   return this.quiz$.pipe(
  //     map((quizzes) => quizzes.filter((quiz) => quiz.category === type).length)
  //   );
  // }
}
