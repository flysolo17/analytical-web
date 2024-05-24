import { Component, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz, QuizType, Subjects } from '../../models/Quiz';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent {
  FOR_UPLOAD: any = null;
  activeModal = inject(NgbActiveModal);

  quizForm$: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService) {
    this.quizForm$ = fb.group({
      cover: [null],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      subject: ['', Validators.required],
      timer: [0, Validators.required],
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
    if (this.quizForm$.valid) {
      const subject = this.quizForm$.get('subject')?.value ?? '';
      let quiz: Quiz = {
        id: '',
        title: this.quizForm$.get('title')?.value ?? '',
        desc: this.quizForm$.get('desc')?.value ?? '',
        cover_photo: '',
        subject: subject === 'MATH' ? Subjects.MATH : Subjects.ENGLISH,
        type: QuizType.MULTIPLE_CHOICE,
        createdAt: new Date(),
        timer: +this.quizForm$.get('timer')?.value || 0,
      };

      if (this.FOR_UPLOAD !== null) {
        this.uploadFile(this.FOR_UPLOAD, quiz);
      } else {
        this.saveQuiz(quiz);
      }
    }
  }

  async uploadFile(file: File, quiz: Quiz) {
    try {
      const result = await this.quizService.uploadFile(file);
      quiz.cover_photo = result;
      this.saveQuiz(quiz);
    } catch (err: any) {
      alert(err['message']);
    }
  }

  saveQuiz(quiz: Quiz) {
    this.quizService
      .createQuiz(quiz)
      .then((data) => {
        alert('Success');
      })
      .catch((err) => alert(err['message']))
      .finally(() => this.activeModal.close());
  }
}
