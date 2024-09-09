import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NIL } from 'uuid';
import { Administrators } from '../../models/Administrator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  activeModal = inject(NgbActiveModal);
  admin$: Administrators | null = null;
  adminForm$: FormGroup | undefined;
  name$: string = '';
  constructor(private authService: AuthService, private fb: FormBuilder) {
    authService.administrator$.subscribe((data) => {
      this.admin$ = data;

      this.adminForm$ = fb.group({});
    });
  }

  onSubmit() {}
}
