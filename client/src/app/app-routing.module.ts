import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'

import { HomeComponent } from './components/home/home.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { BoardPageComponent } from './components/pages/board-page/board-page.component'

import { AuthGuard } from './auth.guard'
import { ReportsPageComponent } from './components/pages/reports-page/reports-page.component'

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { InterceptorService } from './services/interceptor.service'

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
    redirectTo: '/'
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule {}
