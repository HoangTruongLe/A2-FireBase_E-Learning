import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";
import {NewLessonComponent} from "./new-lesson/new-lesson.component";
const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'courses',
        children: [
            {
                path: ':id',
                children: [
                    {
                        path:'',
                        component: CourseDetailComponent
                    },
                    {
                        path: 'new',
                        component: NewLessonComponent
                    }
                ]
            },
            {
                path: '',
                component: CoursesComponent
            }
        ]
    },
    {
        path: 'lessons/:id',
        component:LessonDetailComponent
    },
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule {
}
