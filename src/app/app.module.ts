import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import {firebaseConfig, authConfig} from "../environments/firebase.config";
import {HomeComponent} from './home/home.component';
import {LessonsService} from "./shared/model/lessons.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import {LessonsListComponent} from './lessons-list/lessons-list.component';
import {RoutingModule} from "./app-routing.module";
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';
import {CoursesService} from "./shared/model/courses.service";
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import {LessonResolver} from "./shared/model/lesson.resolver";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./shared/security/auth.service";
import {AuthGuard} from "./shared/security/auth.guard";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LessonsListComponent,
        TopMenuComponent,
        CoursesComponent,
        CourseDetailComponent,
        LessonDetailComponent,
        SafeUrlPipe,
        NewLessonComponent,
        LessonFormComponent,
        EditLessonComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig,authConfig),
        RoutingModule,
        ReactiveFormsModule

    ],
    providers: [LessonsService, CoursesService, LessonResolver,AuthService,AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
