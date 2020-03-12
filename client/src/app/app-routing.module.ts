import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardPageComponent } from './components/pages/board-page/board-page.component';

import { AuthGuard } from './auth.guard';
import { ReportsPageComponent } from './components/pages/reports-page/reports-page.component';

const routes: Routes = [
  {
    path: 'reports',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ReportsPageComponent
      },
      {
        path: ':id',
        component: BoardPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: BoardPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    redirectTo: '/dashboard'
  },
  {
    path: 'home',
    redirectTo: '/',
  },
  { 
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
