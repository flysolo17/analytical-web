import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StudentsService } from '../../services/students.service';
import { Students } from '../../models/students/Student';
import { displayFullname } from '../../utils/Constants';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  students$ = this.studentService.getAllStudent();
  constructor(private studentService: StudentsService) {}

  displayFullname(student: Students): string {
    return displayFullname(student.fname, student.mname, student.lname);
  }
}
