import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MDBBootstrapModule, CheckboxModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'

import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { NavbarComponent } from './components/layout/navbar/navbar.component'
import { EgAppCardComponent } from './components/eg-app-card/eg-app-card.component'
import { FooterComponent } from './components/layout/footer/footer.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ProjectModalComponent } from './components/project-modal/project-modal.component'
import { ProjectCardComponent } from './components/project-card/project-card.component'
import { BoardPageComponent } from './components/pages/board-page/board-page.component'
import { DragDropComponent } from './components/drag-drop/drag-drop.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { BugCardComponent } from './components/bug-card/bug-card.component'
import { BugModalComponent } from './components/bug-modal/bug-modal.component'
import { LoadingCenterComponent } from './components/loading-center/loading-center.component'
import { ReportsPageComponent } from './components/pages/reports-page/reports-page.component'
import { ProjectTabsComponent } from './components/project-tabs/project-tabs.component'
import { ProjectHistoryComponent } from './components/project-history/project-history.component'
import { AddMemberModalComponent } from './components/add-member-modal/add-member-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EgAppCardComponent,
    FooterComponent,
    DashboardComponent,
    ProjectModalComponent,
    ProjectCardComponent,
    BoardPageComponent,
    DragDropComponent,
    BugCardComponent,
    BugModalComponent,
    LoadingCenterComponent,
    ReportsPageComponent,
    ProjectTabsComponent,
    ProjectHistoryComponent,
    AddMemberModalComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CheckboxModule,
    WavesModule,
    ButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
