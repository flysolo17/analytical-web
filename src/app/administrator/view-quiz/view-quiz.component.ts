import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Quiz } from '../../models/Quiz';
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateQuestionComponent } from '../../presentation/create-question/create-question.component';
import { QuizWithQuestions } from '../../models/QuizWithQuestions';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.css',
})
export class ViewQuizComponent implements OnInit, OnDestroy {
  private modalService = inject(NgbModal);
  quizId: string | null = null;
  quiz$: QuizWithQuestions | null = null;
  quizSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location
  ) {
    this.quizSub$ = new Subscription();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = params['id'] ?? null;

      if (this.quizId !== null) {
        this.quizSub$ = this.questionService
          .getQuizWithQuestions(this.quizId)
          .subscribe({
            next: (data: QuizWithQuestions) => {
              this.quiz$ = data;
              console.log(data);
            },
            error: (err: any) => {
              alert(err['message']);
              console.log(err['message']);
              this.location.back();
            },
          });
      }
    });
  }
  ngOnDestroy(): void {
    // if (this.quizSub$) {
    //   this.quizSub$.unsubscribe();
    // }
  }

  createQuestion() {
    const modalRef = this.modalService.open(CreateQuestionComponent);
    modalRef.componentInstance.id = this.quizId;
  }
}
