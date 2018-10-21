import { Component, OnInit } from '@angular/core';
import { LoginService, tokenPayload } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	credentials: tokenPayload = {
		username: '',
		email: '',
		password: ''
	};

  constructor(private login: LoginService, private router: Router) { }

  register() {
  	this.login.register(this.credentials).subscribe(() => {
  		this.router.navigateByUrl('/upload');
  	}, (err) => {
  		console.error(err);
  	})
  }

  ngOnInit() {
  }

}
