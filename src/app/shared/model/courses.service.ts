import {Injectable} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Course} from "./course";
import {Observable} from "rxjs";
import {Lesson} from "./lesson";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";


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
            .filter(results => results && results.length > 0)
            .map(result => result[0])
    }

    findLessonKeysByCourseUrl(courseUrl: string,
                              query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findCourseByUrl(courseUrl)
            .switchMap(course => this.af.database.list(`lessonsPerCourse/${course.$key}`, query))
            .map(lessonKeysObj => lessonKeysObj.map(lessonKey => lessonKey.$key));
    }


    loadFirstPage(courseUrl: string, pageSize: number): Observable<Lesson[]> {

        return this.findLessonKeysByCourseUrl(courseUrl,
                {
                    query: {
                        orderByKey: true,
                        limitToFirst: pageSize
                    }
                })
                .map(lessonKeys => lessonKeys.map(lessonKey => this.af.database.object('lessons/' + lessonKey)))
                .flatMap(fbojs => Observable.combineLatest(fbojs));

    }

    loadNextPage(courseUrl: string,
                 lessonKey: string,
                 pageSize: number): Observable<Lesson[]> {
        return this.findLessonKeysByCourseUrl(courseUrl,
            {
                query: {
                    orderByKey: true,
                    startAt: lessonKey,
                    limitToFirst: pageSize + 1
                }
            })
            .map(lessonKeys => lessonKeys.map(lessonKey => this.af.database.object('lessons/' + lessonKey)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))
            .map(lessons => lessons.slice(1, lessons.length));


    }
    loadPreviousPage(courseUrl: string,
                 lessonKey: string,
                 pageSize: number): Observable<Lesson[]> {
        return this.findLessonKeysByCourseUrl(courseUrl,
            {
                query: {
                    orderByKey: true,
                    endAt: lessonKey,
                    limitToLast: pageSize + 1
                }
            })
            .map(lessonKeys => lessonKeys.map(lessonKey => this.af.database.object('lessons/' + lessonKey)))
            .flatMap(fbojs => Observable.combineLatest(fbojs))
            .map(lessons => lessons.slice(0, lessons.length - 1));
    }
}
