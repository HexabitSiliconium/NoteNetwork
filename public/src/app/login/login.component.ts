import { Component, OnInit } from '@angular/core';
import { LoginService, tokenPayload } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	credentials: tokenPayload = {
		username: '',
		email: '',
		password: ''
	};

  constructor(private loginServ: LoginService, private router: Router) { }

  login() {
  	this.loginServ.login(this.credentials).subscribe(() => {
  		this.router.navigateByUrl('/upload');
  	}, (err) => {
  		console.error(err);
  	});
  }

  ngOnInit() {
  }

}
