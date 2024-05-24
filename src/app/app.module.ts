import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { ViewQuizComponent } from './administrator/view-quiz/view-quiz.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateQuizComponent } from './administrator/create-quiz/create-quiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateQuestionComponent } from './presentation/create-question/create-question.component';
import { RegisterComponent } from './presentation/auth/register/register.component';
import { LoginComponent } from './presentation/auth/login/login.component';
import { AdministratorModule } from './administrator/administrator.module';
import {
  BaseChartDirective,
  NgChartsConfiguration,
  NgChartsModule,
} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    CreateQuizComponent,
    CreateQuestionComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    NgbModule,
    ReactiveFormsModule,
    AdministratorModule,
  ],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'analytical-8e3db',
        appId: '1:434635194953:web:cc095a538c1c1942137598',
        storageBucket: 'analytical-8e3db.appspot.com',
        apiKey: 'AIzaSyC4sV9VjdvTxEDJyWg9audnG89FW67PXzA',
        authDomain: 'analytical-8e3db.firebaseapp.com',
        messagingSenderId: '434635194953',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
