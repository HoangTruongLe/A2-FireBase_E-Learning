import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Lesson} from "./lesson";
import {AngularFire} from "angularfire2";

@Injectable()
export class LessonsService {

    constructor(private af: AngularFire) {
    }

    findAllLessons(): Observable<Lesson[]> {
        return this.af.database.list('lessons');
    }

    findLessonByUrl(lessonUrl): Observable<Lesson> {
        return this.af.database.list('lessons', {
            query: {
                orderByChild: 'url',
                equalTo: lessonUrl
            }
        })
            .filter(result => result && result.length>0)
            .map(result => Lesson.fromJson(result[0]));
    }
}
