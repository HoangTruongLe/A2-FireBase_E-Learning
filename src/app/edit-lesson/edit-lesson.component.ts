import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Lesson} from "../shared/model/lesson";
import {LessonsService} from "../shared/model/lessons.service";

@Component({
    selector: 'edit-lesson',
    templateUrl: './edit-lesson.component.html',
    styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

    lesson: Lesson;

    constructor(private route: ActivatedRoute,
                private lessonsService: LessonsService) {

    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                console.log(data);
                this.lesson = data['lesson'];
            }
        );
    }

    save(formValue) {
        this.lessonsService.saveLesson(this.lesson.$key, formValue)
            .subscribe(
                () => {
                    alert('Lesson saved successfully.');

                },
                err => alert(`Error occurred while save changes.${err}`)
            )
    }

}
