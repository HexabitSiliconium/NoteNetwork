import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { NoteService, Note } from '../note.service';
import { Base64 } from 'js-base64';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-note-individual',
  templateUrl: './note-individual.component.html',
  styleUrls: ['./note-individual.component.css']
})
export class NoteIndividualComponent implements OnInit {
  note: Note;

  pdfSrc : ArrayBuffer | SharedArrayBuffer;
    
  count = 1;
  
  zoomLevel = 1;
  
  rotateOrientation = 0;
  
  disablePrev: boolean = true;
  
  showPages: boolean = false;

  constructor(private activateRoute: ActivatedRoute, private noteService: NoteService) { }

  getNoteDetails(noteId: string) {
    return new Promise (resolve => {
      this.noteService.getIndividualNote(noteId).subscribe(note => {
        this.note = note;
        this.pdfSrc = Base64.atob(String(note.image));
        resolve();
      });
    });
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(param => {
      this.getNoteDetails(param.get(param.keys[0]));
    });
  }

  increment(amount: number){
    if(this.count == 1 && amount ==-1){
      console.log("First page reached.");
    }
    else{
      this.count += amount;
    }
  }
  
  zoomIncrement(amount: number){
    if(this.zoomLevel <= .51 && (amount ==-.1 || amount ==-.05 || amount ==-.01)){
      console.log("Lowest Zoom reached");
    }
    else if(this.zoomLevel >=2 && (amount ==.1 || amount ==.05 || amount ==.01)) {
      console.log("Max Zoom Reached");
    }
    else{
      this.zoomLevel += amount;
    }

  }
  
  rotateIncrement(amount:number){
    this.rotateOrientation += amount;
  }
  
  showPagesToggle(){
    if(this.showPages == true){
      this.showPages = false;

    }
    else{
      this.showPages = true;
      this.count = 1;

    }
    
  }
  
  onFileSelected() {
    let $img: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }
}