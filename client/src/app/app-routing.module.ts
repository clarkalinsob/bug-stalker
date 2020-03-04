import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EgAppCardComponent } from './components/eg-app-card/eg-app-card.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
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
        component: EgAppCardComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
