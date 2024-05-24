import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { SubmissionsComponent } from './submissions/submissions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    GamesComponent,
    ViewQuizComponent,
    SubmissionsComponent,
    LeaderboardComponent,
  ],
  imports: [CommonModule, AdministratorRoutingModule, NgChartsModule],
})
export class AdministratorModule {}
