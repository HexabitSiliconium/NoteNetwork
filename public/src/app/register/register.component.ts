import { Component, OnInit } from '@angular/core';
import { LoginService, tokenPayload } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	//Credentials to upload as token
	credentials: tokenPayload = {
		username: '',
		email: '',
		password: ''
	};
	//Exposes LoginService component and Router module
  constructor(private loginServ: LoginService, private router: Router) { }
	//Register method
  register() {
		//Calls Register method in LoginService component
  	this.loginServ.register(this.credentials).subscribe(() => {
			//Upon success, navigates to upload
  		this.router.navigateByUrl('/upload');
  	}, (err) => {
			//Otherwise dump error in console
  		console.error(err);
  	})
  }

  ngOnInit() {
  }

}
