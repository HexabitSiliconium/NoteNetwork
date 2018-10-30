import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-test',
   template: `
  <div>
  <input (change)="onFileSelected()" type="file" id="file">
      <label>PDF src</label>
      <input type="text" placeholder="PDF src" [(ngModel)]="pdfSrc">
  </div>
  <pdf-viewer [src]="pdfSrc" 
              [render-text]="true"
              style="display: block;"
  ></pdf-viewer>
  `
})
export class PdfTestComponent implements OnInit {

  pdfSrc: string = '/TestPDF.pdf';
  constructor() { }

  ngOnInit() {
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
