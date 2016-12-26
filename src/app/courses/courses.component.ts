import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {Course} from "../shared/model/course";
import {Observable} from "rxjs/observable";
import {FirebaseListObservable} from "angularfire2";
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses$:Course[];

  constructor(private coursesService:CoursesService) { }

  ngOnInit() {
    this.coursesService.findAllCourses()
        .do(console.log)
        .subscribe(
        courses => this.courses$ = courses
    );

  }

}
