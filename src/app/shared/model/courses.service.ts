import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Course} from "./course";
import {Observable} from "rxjs";

@Injectable()
export class CoursesService {

  constructor(private af:AngularFire) { }

  findAllCourses():FirebaseListObservable<Course[]>{
    return this.af.database.list('/courses');
  }

}
