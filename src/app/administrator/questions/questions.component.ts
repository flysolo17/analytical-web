import { Component, OnInit, inject } from '@angular/core';
import {
  QuestionService,
  QuestionsWithSettings,
} from '../../services/question.service';
import { Questions } from '../../models/Questions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateQuestionComponent } from '../create-question/create-question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit {
  modalService = inject(NgbModal);
  questionsWithSettings$: QuestionsWithSettings | undefined;
  questions$: Questions[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(
    private questionsService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.questionsService.getAllQuestionsWithSettings().subscribe((data) => {
      this.questionsWithSettings$ = data;
      this.collectionSize = data.questions.length;
      this.refreshQuestions();
    });
  }
  deleteQuestion(question: Questions) {
    this.questionsService
      .deleteQuestion(question)
      .then((data) => {
        this.toastr.success('Successfully Deleted');
      })
      .catch((err) => {
        this.toastr.error(err['message']);
      });
  }
  refreshQuestions() {
    let all = this.questionsWithSettings$?.questions ?? [];

    this.questions$ = all.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  // loadMoreQuestion(start: number) {
  //   this.questionsService.loadMoreQuestion(start).then((data) => {
  //     this.questions$ = data;
  //   });
  // }
  // loadPrevQuestions() {
  //   let questionID = this.questions$[0].id;
  //   console.log(questionID);
  //   this.questionsService.getPreviousQuestion(questionID).then((data) => {
  //     this.questions$ = data;
  //   });
  // }

  createQuestion() {
    const modal = this.modalService.open(CreateQuestionComponent);
    // const newQueryParams = { param1: 'value1', param2: 'value2' };

    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: newQueryParams,
    //   queryParamsHandling: 'merge',
    // });
  }
}
