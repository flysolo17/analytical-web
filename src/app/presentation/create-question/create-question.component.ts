import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Quiz } from '../../models/Quiz';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { Questions } from '../../models/Questions';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css',
})
export class CreateQuestionComponent {
  FOR_UPLOAD: any = null;
  activeModal = inject(NgbActiveModal);

  questionForm$: FormGroup;
  @Input() id: string = '';
  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService
  ) {
    // <!-- question: string;
    // desc: string;
    // photo: string;
    // answer: string;
    // points
    // choices: string[]; -->
    this.questionForm$ = fb.group({
      cover: [null],
      question: ['', Validators.required],
      desc: ['', Validators.required],
      answer: ['', Validators.required],
      choices: ['', Validators.required],
      points: [1, Validators.required],
    });
  }

  onSelectImage(event: any) {
    this.FOR_UPLOAD = event.target.files[0];
    // if (event.target.files) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]);
    //   reader.onload = (e: any) => {
    //     this.PRODUCT_IMAGE = e.target.result;
    //   };
    // }
  }

  onSubmit() {
    if (this.questionForm$.valid) {
      let choicesString = this.questionForm$.get('choices')?.value ?? '';
      let choicesArray = choicesString.split(',').map((e: string) => e);

      let question: Questions = {
        id: '',
        question: this.questionForm$.get('question')?.value ?? '',
        desc: this.questionForm$.get('desc')?.value ?? '',
        photo: '',
        answer: this.questionForm$.get('answer')?.value ?? '',
        points: +this.questionForm$.get('points')?.value || 0,
        choices: choicesArray,
      };
      if (this.FOR_UPLOAD !== null) {
        this.uploadFile(this.FOR_UPLOAD, question);
      } else {
        this.saveQuestion(question);
      }
    }
  }

  async uploadFile(file: File, question: Questions) {
    try {
      const result = await this.questionService.uploadFile(file);
      question.photo = result;
      this.saveQuestion(question);
    } catch (err: any) {
      alert(err['message']);
    }
  }

  saveQuestion(question: Questions) {
    this.questionService
      .addQuestion(this.id, question)
      .then((data) => {
        alert('Success');
      })
      .catch((err) => alert(err['message']))
      .finally(() => this.activeModal.close());
  }
}
