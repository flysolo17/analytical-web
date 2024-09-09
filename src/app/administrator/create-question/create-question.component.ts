import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Quiz } from '../../models/Quiz';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { Questions } from '../../models/Questions';
import { ToastrService } from 'ngx-toastr';

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
  choices$: string[] = [];
  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private toastr: ToastrService
  ) {
    // <!-- question: string;
    // desc: string;
    // photo: string;
    // answer: string;
    // points
    // choices: string[]; -->
    this.questionForm$ = fb.group({
      answer: ['', Validators.required],
      category: ['REBUS_PUZZLE', Validators.required],
      choices: [''],
    });
  }
  addToChoices() {
    let currentChoice$: string = this.questionForm$.get('choices')?.value ?? '';
    console.log(currentChoice$);
    if (currentChoice$ === '') {
      this.toastr.error('Invalid choice');
      return;
    }
    if (this.choices$.includes(currentChoice$.toLowerCase())) {
      this.toastr.warning('Already exists!');
      return;
    }
    this.choices$.push(currentChoice$.toLowerCase());
    this.questionForm$.get('choices')?.setValue('');
  }

  removeChoice(choice: string) {
    const index = this.choices$.findIndex(
      (c) => c.toLowerCase() === choice.toLowerCase()
    );
    if (index !== -1) {
      this.choices$.splice(index, 1);
    } else {
      console.warn(`Choice "${choice}" not found in choices list.`);
    }
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
    if (!this.questionForm$.valid) return;

    if (!this.FOR_UPLOAD) {
      this.toastr.error('Please Add image.');
      return;
    }

    const answer = this.questionForm$.get('answer')?.value?.toLowerCase() ?? '';

    const category:
      | 'REBUS_PUZZLE'
      | 'RIDDLES'
      | 'WORD_PUZZLE'
      | 'MATH_LOGIC_PUZZLE' =
      this.questionForm$.get('category')?.value ?? 'REBUS_PUZZLE';

    const question: Questions = {
      id: '',
      question: '',
      answer,
      choices: this.choices$,
      type: category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.saveQuestion(question, this.FOR_UPLOAD);
  }

  saveQuestion(question: Questions, file: File) {
    this.questionService
      .createQuestion(question, file)
      .then((data) => {
        this.toastr.success('Success');
      })
      .catch((err) => this.toastr.error(err['message']))
      .finally(() => this.activeModal.close());
  }
}
