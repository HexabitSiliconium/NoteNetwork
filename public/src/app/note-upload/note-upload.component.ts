import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from '../note.service';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-note-upload',
  templateUrl: './note-upload.component.html',
  styleUrls: ['./note-upload.component.css']
})
export class NoteUploadComponent implements OnInit {
  //Note object to upload
  noteUpload: Note = {
    name: '',
    image: '',
    description: '',
    tags: [],
	};
  //Exposes NoteService component
  constructor(private noteServ: NoteService) { }
  //Upload method
  upload() {
    //If all the required fields have been added
    if (this.noteUpload.name &&
      this.noteUpload.image &&
      this.noteUpload.description) {
      //Calls upload method in NoteService component
      this.noteServ.upload(this.noteUpload).subscribe(res => {
        //Display success message and clear inputs
        window.alert("Successfully uploaded notes!");
        this.noteUpload.name = '';
        this.noteUpload.image = '';
        this.noteUpload.description = '';
        this.noteUpload.tags = [];
      }, (err) => {
        console.log(err);
        window.alert("Failed to upload notes");
      })
    }
  }

  //Event handler to detect file changes
  onFileChange(event) {
    //Creates FileReader
    var reader = new FileReader();
    //Point to file in event
    var file = event.target.files[0];
    //Reader reads file as dataURL(base64 string)
    reader.readAsDataURL(file);
    //When reader receives file, calls this
    reader.onload = () => {
      //Sets noteupload to base64 string representation of file
      this.noteUpload.image = Base64.btoa(reader.result.toString());
    }
  }

  //TODO: ONADD AND ONREMOVE FOR TAGGING

  ngOnInit() {
  }
}