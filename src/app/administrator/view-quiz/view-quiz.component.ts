import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Quiz } from '../../models/Quiz';
import { Observable, Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { QuizWithQuestions } from '../../models/QuizWithQuestions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.css',
})
export class ViewQuizComponent implements OnInit {
  private modalService = inject(NgbModal);
  quizId: string | null = null;
  quiz$: Observable<Quiz> | undefined;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = params['id'] ?? null;
      if (this.quizId !== null) {
        this.quiz$ = this.quizService.getQuizById(this.quizId);
      }
    });
  }

  deleteQuiz(quizID: string, quizImage: string) {
    this.quizService
      .deleteQuiz(quizID, quizImage)
      .then((data) => this.toastr.success('Successfully Deleted'))
      .catch((err) => this.toastr.error(err['message']))
      .finally(() => this.location.back());
  }
}
