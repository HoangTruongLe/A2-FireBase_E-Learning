import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {Lesson} from "../shared/model/lesson";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../shared/model/course";

@Component({
    selector: 'course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

    lessons: Lesson[];
    course: Course;
    pageSize = 3;
    lessonKey: string;
    courseUrl: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private coursesService: CoursesService) {
    }

    ngOnInit() {
        //take snapshot param id
        this.courseUrl = this.route.snapshot.params['id'];

        //find course by url
        this.coursesService.findCourseByUrl(this.courseUrl)
            .subscribe(result => this.course = result);

        //load first page of course
        this.getFirstPage(this.courseUrl);

    }

    getFirstPage(courseUrl) {
        this.coursesService.loadFirstPage(courseUrl, this.pageSize)
            .subscribe(
                lessons => {
                    this.lessons = lessons;
                }
            );
    }

    next() {

        if (this.lessons.length > 0) {
            this.lessonKey = this.lessons[this.lessons.length - 1].$key;
            this.coursesService.loadNextPage(this.courseUrl, this.lessonKey, this.pageSize)
                .subscribe(lessons => this.lessons = lessons);
        }

    }

    previous() {

        if (this.lessons.length > 0) {
            this.lessonKey = this.lessons[0].$key;

            this.coursesService.loadPreviousPage(this.courseUrl, this.lessonKey, this.pageSize)
                .subscribe(lessons => this.lessons = lessons);
        }

    }

}
