import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'courses',
    component: CoursesComponent
  },
  {
    path:'**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
