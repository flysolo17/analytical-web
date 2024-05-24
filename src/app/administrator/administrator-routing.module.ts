import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../presentation/auth/login/login.component';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
      },
      {
        path: 'games',
        component: GamesComponent,
      },
      {
        path: 'games/view/:id',
        component: ViewQuizComponent,
      },
      {
        path: 'submissions',
        component: SubmissionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
})
export class AdministratorRoutingModule {}
