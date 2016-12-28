import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Course} from "./course";
import {Observable} from "rxjs";
import {Lesson} from "./lesson";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';


@Injectable()
export class CoursesService {

    constructor(private af: AngularFire) {
    }

    findAllCourses(): Observable<Course[]> {
        return this.af.database.list('courses');
    }

    findCourseByUrl(courseUrl: string): Observable<any> {
        return this.af.database.list('courses', {
            query: {
                orderByChild: 'url',
                equalTo: courseUrl
            }
        })
            .map(result => result[0])

    }

    findLessonKeysByCourseUrl(courseUrl: string): Observable<string[]> {
        return this.findCourseByUrl(courseUrl)
            .filter(course => !!course)
            .switchMap(course => this.af.database.list(`lessonsPerCourse/${course.$key}`))
            .map(lessonKeysObj => lessonKeysObj.map(lessonKey => lessonKey.$key));
    }

    findLessonsPerCourse(courseUrl: string): Observable<Lesson[]> {
        return this.findLessonKeysByCourseUrl(courseUrl)
            .filter(results => results && results.length > 0)
            .do(console.log)
            .map(lessonKeys => lessonKeys.map(lessonKey => this.af.database.object('lessons/' + lessonKey)))
            .flatMap(fbojs => Observable.combineLatest(fbojs));

    }


}
