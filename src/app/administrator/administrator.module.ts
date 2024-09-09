import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { AdministratorRoutingModule } from './administrator-routing.module';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';

import { QuestionsComponent } from './questions/questions.component';
import { NgbNavModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

import { AddLevelComponent } from './add-level/add-level.component';
import { UpdateLevelComponent } from './update-level/update-level.component';

import { LevelsTableComponent } from './levels-table/levels-table.component';

import { ProfileComponent } from '../auth/profile/profile.component';
import { SubmissionsComponent } from './submissions/submissions.component';

@NgModule({
  declarations: [
    MainComponent,
    GamesComponent,
    ViewQuizComponent,
    ProfileComponent,
    SubmissionsComponent,
    LeaderboardComponent,
    QuestionsComponent,
    LevelsTableComponent,
    AddLevelComponent,
    UpdateLevelComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    NgChartsModule,
    NgbPagination,
    NgbNavModule,
  ],
})
export class AdministratorModule {}
