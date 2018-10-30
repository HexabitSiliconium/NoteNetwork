import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-test',
   template: `
  <div>
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

}
