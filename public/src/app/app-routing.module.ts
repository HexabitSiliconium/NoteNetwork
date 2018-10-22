import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { NoteUploadComponent } from './note-upload/note-upload.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'upload', component: NoteUploadComponent , canActivate: [AuthGuardService]},
	{ path: 'notes', component: NoteViewComponent, canActivate: [AuthGuardService] },
	{ path: 'register', component: RegisterComponent },
	{ path: '', component: HomeComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
