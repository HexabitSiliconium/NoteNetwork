import { Component, OnInit } from '@angular/core';
import { LoginService, tokenPayload } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	//Token payload, credentials for login
	credentials: tokenPayload = {
		username: '',
		email: '',
		password: ''
	};
	//Exposing LoginService component and router module
  constructor(private loginServ: LoginService, private router: Router) { }
	//Login method
  login() {
		//Calls login method in LoginService component
  	this.loginServ.login(this.credentials).subscribe(() => {
			//If successful, navigates to upload page
  		this.router.navigateByUrl('/upload');
  	}, (err) => {
			//Otherwise spits out error
  		console.error(err);
  	});
  }

  ngOnInit() {
  }

}
