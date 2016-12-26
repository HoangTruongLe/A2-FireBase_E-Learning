import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import {firebaseConfig} from "../environments/firebase.config";
import {HomeComponent} from './home/home.component';
import {LessonsService} from "./shared/model/lessons.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {LessonsListComponent} from './lessons-list/lessons-list.component';
import {RoutingModule} from "./app-routing.module";
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';
import {CoursesService} from "./shared/model/courses.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LessonsListComponent,
        TopMenuComponent,
        CoursesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        RoutingModule
    ],
    providers: [LessonsService, CoursesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}