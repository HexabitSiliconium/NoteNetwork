import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NoteUploadComponent } from './note-upload/note-upload.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import {PdfTestComponent} from './pdf-test/pdf-test.component';

//Routes for frontend, leads to different component HTMLs
//IE websitenamehere.com/login leads to login page
const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	//AuthGuard blocks users who are not logged in from accessing those pages
	{ path: 'upload', component: NoteUploadComponent , canActivate: [AuthGuardService]},
	{ path: 'notes', component: NoteViewComponent, canActivate: [AuthGuardService] },
	{ path: 'register', component: RegisterComponent },
	{ path: '', component: HomeComponent},
	{ path: 'pdf', component: PdfTestComponent},
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
