import { Routes } from '@angular/router';
import { FormGroupSampleComponent } from './components/form-group-sample/form-group-sample.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableApiComponent } from './components/table-api/table-api.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    children: [
      {
        path: '',
        title: 'Tech Stack',
        component: TechStackComponent,
      },
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
      },
      {
        path: 'table-api',
        title: 'Table API',
        component: TableApiComponent,
        canActivate: [authGuard],
      },
      {
        path: 'form',
        title: 'Form',
        component: FormGroupSampleComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', title: 'Unknown', component: PageNotFoundComponent },
  // {
  //   path: 'home-page',
  //   title: 'Home Page',
  //   component: HomePageComponent,
  //   children: [
  //     {
  //       path: 'child-a',
  //       title: 'Child A',
  //       component: ChildAComponent,
  //     },
  //     {
  //       path: 'child-b',
  //       title: 'Child B',
  //       component: ChildBComponent,
  //     },
  //   ],
  // },
  // {
  //   path: 'login',
  //   title: 'Login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'protected-page',
  //   title: 'Protected Page',
  //   component: ProtectedPageComponent,
  //   canActivate: [authGuard],
  // },
  // { path: 'form', title: 'Form', component: FormComponent },
  // {
  //   path: 'form-group-sample',
  //   title: 'Form Group Sample',
  //   component: FormGroupSampleComponent,
  // },
  // {
  //   path: 'angular-material-learning',
  //   title: 'Angular Material Learning',
  //   component: AngularMaterialLearningComponent,
  // },
  // {
  //   path: 'address',
  //   title: 'Address',
  //   component: AddressComponent,
  // },
];
