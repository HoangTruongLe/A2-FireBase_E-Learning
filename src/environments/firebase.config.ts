
import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyAsUYJ1arkkgp-J0qkntRtaWdbp7UnPePI",
    authDomain: "e-learning-564e2.firebaseapp.com",
    databaseURL: "https://e-learning-564e2.firebaseio.com",
    storageBucket: "e-learning-564e2.appspot.com",
    messagingSenderId: "968030540612"
};



export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};