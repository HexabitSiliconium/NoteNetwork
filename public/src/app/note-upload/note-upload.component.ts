import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from '../note.service';

@Component({
  selector: 'app-note-upload',
  templateUrl: './note-upload.component.html',
  styleUrls: ['./note-upload.component.css']
})
export class NoteUploadComponent implements OnInit {
  base64textString = [];

  noteUpload: Note = {
    name: '',
    image: '',
    description: ''
	};

  constructor(private noteServ: NoteService) { }

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
    var reader = new FileReader();
    var file = event.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.noteUpload.image = reader.result.toString();
    }
  }

  ngOnInit() {
  }

}
