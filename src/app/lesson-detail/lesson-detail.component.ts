import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

@Component({
    selector: 'lesson-detail',
    templateUrl: './lesson-detail.component.html',
    styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

    lesson: Lesson;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private lessonService: LessonsService) {
    }

    ngOnInit() {
        this.route.params
            .distinctUntilChanged()
            .switchMap(params => {
                const lessonUrl = params['id'];
                console.log(lessonUrl);
                return this.lessonService.findLessonByUrl(lessonUrl)

            })
            .subscribe(lesson => this.lesson = lesson);
    }

    previous() {

        this.lessonService.findPreviousLesson(this.lesson.courseId, this.lesson.$key)
            .subscribe(this.navigateToLesson.bind(this));
    }

    next() {
        this.lessonService.findNextLesson(this.lesson.courseId, this.lesson.$key)
            .subscribe(this.navigateToLesson.bind(this));
    }

    navigateToLesson(lesson: Lesson) {
        this.router.navigate(['lessons', lesson.url]);
    }

}
