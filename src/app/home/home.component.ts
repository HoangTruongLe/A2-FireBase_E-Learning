import {Component, OnInit} from '@angular/core';
import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";
import {filter} from "rxjs/operator/filter";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    lessons: Lesson[];
    filtered:Lesson[];

    constructor(private lessonService: LessonsService) {
    }

    ngOnInit() {
        this.lessonService.findAllLessons()
            .do(console.log)
            .subscribe(lessons => this.lessons = this.filtered = lessons);
    }
    search(search:string){
        console.log(search);
        this.filtered = this.lessons.filter(lessons => lessons.description.includes(search));
        console.log(this.filtered);
    }

}
