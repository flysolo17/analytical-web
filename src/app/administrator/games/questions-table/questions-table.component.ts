import { Component, inject, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { QuestionsWithLevels } from '../view-quiz/view-quiz.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CreateQuestionComponent } from '../../questions/create-question/create-question.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Questions } from '../../../models/Questions';
import { Levels } from '../../../models/quiz/Levels';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Quiz } from '../../../models/quiz/Quiz';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrl: './questions-table.component.css',
})
export class QuestionsTableComponent implements OnInit {
  @Input() game!: Quiz;
  @Input() levels: Levels[] = [];
  questions: Questions[] = []; // assuming your Submission model
  currentPage = 1;
  pageSize = 10;
  paginatedQuestions: Questions[] = [];
  searchControl: FormControl = new FormControl('');
  constructor(
    private questionService: QuestionService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.questionService
      .getAllQuestionByGameID(this.game.id)
      .subscribe((data) => {
        this.questions = data;
        this.updatePaginatedQuestion();
      });
    this.searchControl.valueChanges.subscribe(() => {
      this.updatePaginatedQuestion();
    });
  }

  updatePaginatedQuestion(): void {
    const searchTerm = this.searchControl.value.toLowerCase();
    const filteredSubmissions = this.questions.filter((question) => {
      const searchTerm = this.searchControl.value.toLowerCase();
      return (
        // by game name
        question.question?.toLowerCase().includes(searchTerm)
      );
    });
    const startItem = (this.currentPage - 1) * this.pageSize;
    const endItem = startItem + this.pageSize;

    this.paginatedQuestions = filteredSubmissions.slice(startItem, endItem);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedQuestion();
  }

  deleteQuestion(question: Questions) {
    const modal = this.modalService.open(DeleteConfirmationComponent);
    modal.componentInstance.message = `Are you sure you want to delete
    ${question.question} ?`;
    modal.result.then((data) => {
      if (data === 'YES') {
        this.questionService
          .deleteQuestion(question)
          .then((data) => this.toastr.success('successfully deleted'))
          .catch((err) => this.toastr.error(err['message']));
      }
    });
  }

  createQuestion(levels: Levels[]) {
    const modal = this.modalService.open(CreateQuestionComponent, {
      size: 'xl',
    });
    modal.componentInstance.levels = levels;
    modal.componentInstance.type = this.game.category;
    modal.componentInstance.gameID = this.game.id;
  }
}
