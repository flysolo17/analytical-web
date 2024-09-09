import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewQuizComponent } from './administrator/view-quiz/view-quiz.component';

import { MainComponent } from './administrator/main/main.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    loadChildren: () =>
      import('./administrator/administrator-routing.module').then(
        (m) => m.AdministratorRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
