import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-test',
  templateUrl:'./pdf-test.component.html',
  styleUrls:['./pdf-test.component.css']
  
})
export class PdfTestComponent implements OnInit {

  pdfSrc: string = '/TestPDF.pdf';
  
  count = 1;
  
  disablePrev: boolean = true;
  
  constructor() { }
  
  increment(amount: number){
	  if(this.count == 1 && amount ==-1){
		  console.log("First page reached.");
	  }
	  else{
		  this.count += amount;
	  }
	
  }
  

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
