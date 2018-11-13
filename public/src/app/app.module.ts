import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';


//For PDFs later: https://github.com/vadimdez/ng2-pdf-viewer
//Component and module imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteUploadComponent } from './note-upload/note-upload.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import{PdfTestComponent} from './pdf-test/pdf-test.component';
import { NoteIndividualComponent } from './note-individual/note-individual.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoteViewComponent,
    NoteUploadComponent,
    RegisterComponent,
    HomeComponent,
	PdfTestComponent,
	NoteIndividualComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
	PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
