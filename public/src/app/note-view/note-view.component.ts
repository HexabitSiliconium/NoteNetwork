import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NoteService, Note } from '../note.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  notes: any[] = [];

  constructor(private noteService: NoteService, private sanitizer: DomSanitizer) { }

  getNotes() {
    this.noteService.getNotes().subscribe(notes => {
      for (let note of notes) {
        note.image = this.sanitizer.bypassSecurityTrustResourceUrl(note.image);
        this.notes.push(note);
      }
    })
  }

  ngOnInit() {
    this.getNotes();
  }

}
