import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { NoteService, Note } from '../note.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-note-individual',
  templateUrl: './note-individual.component.html',
  styleUrls: ['./note-individual.component.css']
})
export class NoteIndividualComponent implements OnInit {
  note: Note;

  constructor(private activateRoute: ActivatedRoute, private noteService: NoteService) { }

  getNoteDetails(noteId: string) {
    return new Promise (resolve => {
      this.noteService.getIndividualNote(noteId).subscribe(note => {
        this.note = note;
        resolve();
      });
    });
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(param => {
      this.getNoteDetails(param.get(param.keys[0]));
    });
  }
}