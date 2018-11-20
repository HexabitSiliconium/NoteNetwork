import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
//User interface, stores user info
export interface User {
	username: string;
	email: string;
	exp: number;
	iat: number;
}
//Token response interface, handles and stores responses
interface tokenResponse {
	token: string;
	username: string;
}
//Token payload interface, stores information for requests
export interface tokenPayload {
	username: string;
	email: string;
	password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	private token: string;
	//Exposes HttpClient and Router modules
  	constructor(private http: HttpClient, private router: Router) { }
	//Saves response token in browser local storage
  	private saveToken(token: string): void {
  		localStorage.setItem('user-token', token);
		this.token = token;
  	}
	//Gets user token in browser storage
  	private getToken(): string {
  		if (!this.token) {
  			this.token = localStorage.getItem('user-token');
  		}
  		return this.token;
  	}
	//Logs user out and removes their token from the browser
  	public logout(): void {
  		this.token = '';
		window.localStorage.removeItem('user-token');
		window.localStorage.removeItem('username');
  		this.router.navigateByUrl('/login');
  	}
	//Gets current user based on token
  	public getUser(): User {
		//Gets current token
  		const token = this.getToken();
		let payload;
		//Generate payload if token is found
  		if (token) {
			//User found in token
			payload = token.split('.')[1];
			//Translates payload
			payload = window.atob(payload);
			//Parse token as JSON
  			return JSON.parse(payload);
  		} else {
  			return null;
  		}
  	}
	//Checks if user is logged in
  	public isLoggedIn(): boolean {
		//Gets user from session storage
		const user = this.getUser();
		//Checks user expiration, if past certain date, returns false
  		if (user) {
  			return user.exp > Date.now() / 1000;
		}
		//Returns false by default
  	}
	//Makes post request to api register endpoint
  	public register(user: tokenPayload): Observable<any> {
  		return this.http.post('http://ec2-18-191-193-137.us-east-2.compute.amazonaws.com:8080/api/register', user)
  			.pipe(//Pipe response
  				map((data: tokenResponse) => {
					//If response received, save token and set username in local storage
  					if (data.token) {
						  this.saveToken(data.token);
						  window.localStorage.setItem('username', data.username);
  					}
  				})
  			);
  	}
	//Makes post request to api login endpoint
  	public login(user: tokenPayload): Observable<any> {
  		return this.http.post('http://ec2-18-191-193-137.us-east-2.compute.amazonaws.com:8080/api/login', user)
  			.pipe(//Pipes response
  				map((data: tokenResponse) => {
					//If response received, save token and set username in local storage
  					if (data.token) {
						  this.saveToken(data.token);
						  window.localStorage.setItem('username', data.username);
  					}
  				})
  			);;
  	}
}