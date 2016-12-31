import { Injectable } from '@angular/core';
import {FirebaseAuth} from "angularfire2";
import {Observable, Subject} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private  auth: FirebaseAuth) { }

  login(email,password):Observable<any>{
   return this.fromFirebaseAuthPromise(this.auth.login({email,password}));
  }

  fromFirebaseAuthPromise(promise):Observable<any>{

    const subject = new Subject<any>();
    promise.then(res => {
      subject.next(res);
      subject.complete();
    },
    err => {
      subject.error(err);
      subject.complete();
    });
    return subject.asObservable();
  }

}
