import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

import { combineLatest, map, Observable, of, Subscription } from 'rxjs';
import { QuizService } from '../../../services/quiz.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { QuizWithQuestions } from '../../../models/quiz/QuizWithQuestions';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from '../../../models/quiz/Quiz';
import { Levels } from '../../../models/quiz/Levels';
import { CreateQuestionComponent } from '../../questions/create-question/create-question.component';
import { LevelsService } from '../../../services/levels.service';
import { Questions } from '../../../models/Questions';

export interface QuestionsWithLevels {
  question: Questions;
  levelName: string;
}
@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.css',
})
export class ViewQuizComponent implements OnInit {
  private modalService = inject(NgbModal);
  quizId: string | null = null;
  quiz$: Observable<Quiz> | undefined;
  levels$: Observable<Levels[]> | undefined;
  questions$: Observable<QuestionsWithLevels[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private levelService: LevelsService,
    private location: Location,
    private toastr: ToastrService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = params['id'] ?? null;
      if (this.quizId !== null) {
        this.quiz$ = this.quizService.getQuizById(this.quizId);
        this.levels$ = this.levelService.getLevels(this.quizId);
        this.questions$ = combineLatest([
          this.questionService.getAllQuestionByGameID(this.quizId),
          this.levels$,
        ]).pipe(
          map(([questions, levels]) => {
            return questions.map((question) => {
              const level = levels.find(
                (level) => level.id === question.levelID
              );
              return {
                question: question,
                levelName: level ? level.name : 'Unknown Level',
              };
            });
          })
        );
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
  deleteQuestion(question: Questions) {
    this.questionService
      .deleteQuestion(question)
      .then((data) => this.toastr.success('successfully deleted'))
      .catch((err) => this.toastr.error(err['message']));
  }
  createQuestion(levels: Levels[]) {
    this.quiz$?.subscribe((data) => {
      const modal = this.modalService.open(CreateQuestionComponent, {
        size: 'xl',
      });
      modal.componentInstance.levels = levels;
      modal.componentInstance.type = data.category;
      modal.componentInstance.gameID = data.id;
    });
  }

  getLevelName(levelID: string): Observable<string> {
    return (
      this.levels$?.pipe(
        map((levels) => {
          const level = levels.find((level) => level.id === levelID);
          return level ? level.name : 'Unknown Level';
        })
      ) ?? of('Unknown Level')
    );
  }
}
