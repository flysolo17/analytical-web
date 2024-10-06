import { Component, Input, OnInit, inject } from '@angular/core';
import { LevelsService } from '../../services/levels.service';
import { Observable, firstValueFrom, from } from 'rxjs';
import { Levels } from '../../models/quiz/Levels';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLevelComponent } from '../../administrator/add-level/add-level.component';
import { UpdateLevelComponent } from '../../administrator/update-level/update-level.component';

@Component({
  selector: 'app-levels-table',
  templateUrl: './levels-table.component.html',
  styleUrl: './levels-table.component.css',
})
export class LevelsTableComponent implements OnInit {
  @Input() quizID: string = '';
  @Input() levels: Levels[] = [];

  modalService = inject(NgbModal);
  constructor(
    private levelService: LevelsService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}
  deleteLevel(quizID: string, levelID: string) {
    this.levelService
      .deleteLevel(quizID, levelID)
      .then(() => this.toastr.success('Successfully Deleted'))
      .catch((err) => this.toastr.error(err['message'].toString()));
  }
  async addLevel(quizID: string) {
    if (this.levels) {
      try {
        const level = await firstValueFrom(from(this.levels));
        const modal = this.modalService.open(AddLevelComponent);
        modal.componentInstance.quizID = quizID;
        modal.componentInstance.count = this.levels.length;
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    }
  }
  updateLevel(quizID: string, level: Levels) {
    const modal = this.modalService.open(UpdateLevelComponent);
    modal.componentInstance.quizID = quizID;
    modal.componentInstance.level = level;
  }
}
