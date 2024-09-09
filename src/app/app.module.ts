import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { ViewQuizComponent } from './administrator/view-quiz/view-quiz.component';
import {
  NgbModule,
  NgbPagination,
  NgbPaginationConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { CreateQuizComponent } from './administrator/create-quiz/create-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  BaseChartDirective,
  NgChartsConfiguration,
  NgChartsModule,
} from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { PrimaryButtonComponent } from './custom/primary-button/primary-button.component';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { CreateQuestionComponent } from './administrator/create-question/create-question.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdministratorModule } from './administrator/administrator.module';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    CreateQuizComponent,
    CreateQuestionComponent,
    RegisterComponent,
    PrimaryButtonComponent,
    ForgotPasswordComponent,
    EditProfileComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,

    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdministratorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
