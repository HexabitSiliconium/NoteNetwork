import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
<<<<<<< HEAD
//For PDFs later: https://github.com/vadimdez/ng2-pdf-viewer
=======
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

>>>>>>> master
//Component and module imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteUploadComponent } from './note-upload/note-upload.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import{PdfTestComponent} from './pdf-test/pdf-test.component';
=======
import { PdfTestComponent } from './pdf-test/pdf-test.component';
>>>>>>> master
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
<<<<<<< HEAD
    PdfViewerModule
=======
    PdfViewerModule,
    TagInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
>>>>>>> master
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
