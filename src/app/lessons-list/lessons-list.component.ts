import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import {Router} from "@angular/router";

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {

  @Input()
  lessons:Lesson[];

  constructor(private router:Router) { }

  ngOnInit() {
  }

  selectLesson(lesson:Lesson)
  {
      this.router.navigate(['lessons', lesson.url]);
  }
}
