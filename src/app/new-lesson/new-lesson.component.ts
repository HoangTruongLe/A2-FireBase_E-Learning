import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";

@Component({
  selector: 'new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  courseId:string;
  constructor(private route:ActivatedRoute, private  lessonsService: LessonsService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.queryParams['courseId'];

  }
  save(form){
    this.lessonsService.createNewLesson(this.courseId,form.value)
        .subscribe(
            () =>{
              alert('Lesson created successfully. Do you want another lesson ?');
              form.reset();
            },
            error => alert(`Error occurred while creating new lesson ${error}`)
        );
  }

}
