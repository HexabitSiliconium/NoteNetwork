import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-test',
  templateUrl:'./pdf-test.component.html',
  styleUrls:['./pdf-test.component.css']
  
})
export class PdfTestComponent implements OnInit {

  pdfSrc: string = 'src/app/pdf-test/TestPDF.pdf';
  
  count = 1;
  
  zoomLevel = 1;
  
  rotateOrientation = 0;
  
  disablePrev: boolean = true;
  
  showPages: boolean = false;
  
  constructor() { }
  
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
