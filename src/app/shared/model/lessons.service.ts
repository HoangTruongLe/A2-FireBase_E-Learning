import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {Lesson} from "./lesson";
import {AngularFire, FirebaseRef} from "angularfire2";


@Injectable()
export class LessonsService {
    sdkRef;

    constructor(private af: AngularFire, @Inject(FirebaseRef) fb) {
        this.sdkRef = fb.database().ref();
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
        // .do(console.log)
            .filter(result => result && result.length > 0)
            .map(result => Lesson.fromJson(result[0]));
    }

    findNextLesson(courseId: string, lessonKey: string): Observable<Lesson> {
        return this.af.database.list(`lessonsPerCourse/${courseId}`, {
            query: {
                orderByKey: true,
                startAt: lessonKey,
                limitToFirst: 2
            }
        })
        //.filter(result => result && result.length > 0)
            .map(lesson => lesson[1].$key)
            .switchMap(lessonId => this.af.database.object(`lessons/${lessonId}`))
            .map(Lesson.fromJson);

    }

    findPreviousLesson(courseId: string, lessonKey: string): Observable<Lesson> {
        return this.af.database.list(`lessonsPerCourse/${courseId}`, {
            query: {
                orderByKey: true,
                endAt: lessonKey,
                limitToLast: 2
            }
        })
        // .filter(result => result && result.length > 0)
            .map(lesson => lesson[0].$key)
            .switchMap(lessonId => this.af.database.object(`lessons/${lessonId}`))
            .map(Lesson.fromJson);
    }

    createNewLesson(courseId, lesson: any): Observable<any> {
        const lessonToSave = Object.assign({}, lesson, {courseId});
        const newLessonKey = this.sdkRef.child('lessons').push().key;


        var dataToSave = {};
        dataToSave[`lessons/${newLessonKey}`] = lessonToSave;
        dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;
        return this.firebaseUpdate(dataToSave)

    };

    firebaseUpdate(dataToSave){
        const subject = new Subject();
        this.sdkRef.update(dataToSave)
            .then(
                val => {
                    subject.next(val);
                    subject.complete();
                },
                err => {
                    subject.error(err);
                    subject.complete();
                });
        return subject.asObservable();
    }
}
