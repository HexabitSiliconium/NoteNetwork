import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from '../note.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-note-upload',
  templateUrl: './note-upload.component.html',
  styleUrls: ['./note-upload.component.css']
})
export class NoteUploadComponent implements OnInit {
  base64textString = [];
  sanitizedURL: SafeResourceUrl;

  noteUpload: Note = {
    name: '',
    image: '',
    description: ''
	};

  constructor(private noteServ: NoteService, private _sanitizer: DomSanitizer) { }

  upload() {
    if (this.noteUpload.image) {
      this.noteServ.upload(this.noteUpload).subscribe(data => {
        console.log(data);
      }, (err) => {
        console.error(err);
      })
    }
  }

  onFileChange(event) {
    //this.noteUpload.image = event.target.files[0];

    
    var reader = new FileReader();
    var file = event.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.noteUpload.image = reader.result.toString();
      
      //this.sanitizedURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.noteUpload.image);
    }
  }

  ngOnInit() {
  }

}
