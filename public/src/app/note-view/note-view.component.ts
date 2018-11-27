import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from 'js-base64';

import { NoteService, Note } from '../note.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  //array of any objects(should probably be changed to Note objects)
  notes: any[] = [];
  query: "";
  //Exposes NoteService component and DomSanitizer module
  constructor(private noteService: NoteService, private sanitizer: DomSanitizer) { }
  //Method to get notes
  getNotes() {
    //Calls getNotes method in NoteService
    this.noteService.getNotes().subscribe(notes => {
      console.log(notes);
      //For all the notes received in the response,
      for (let note of notes) {
        //Decode note's image
        note.image = Base64.atob(note.image);//this.sanitizer.bypassSecurityTrustUrl(note.image);
        //Push note into notes array
        this.notes.push(note);
      }
    })
  }

  ngOnInit() {
    this.getNotes();
  }
}