import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoPageComponent } from './no-page/no-page.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from './auth/auth.guard';
import { StudentGuard } from './auth/student.guard';
import { TeacherGuard } from './auth/teacher.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard, TeacherGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'student',
    component: ResultComponent,
    canActivate: [AuthGuard, StudentGuard],
  },
  {
    path: 'edit/:rollNo',
    component: AddEditComponent,
    canActivate: [AuthGuard, TeacherGuard],
  },
  {
    path: 'new',
    component: AddEditComponent,
    canActivate: [AuthGuard, TeacherGuard],
  },

  {
    path: '**',
    component: NoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
