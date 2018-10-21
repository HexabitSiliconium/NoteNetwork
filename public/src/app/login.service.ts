import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
	 _id: string;
	 email: string;
	 exp: number;
	 iat: number;
}

interface tokenResponse {
	token: string;
}

export interface tokenPayload {
	username: string;
	email: string;
	password: string;
}

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		observe: "response" as 'body',
	})
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	private token: string;

  	constructor(private http: HttpClient, private router: Router) { }

  	private saveToken(token: string): void {
  		localStorage.setItem('user-token', token);
  		this.token = token;
  	}

  	private getToken(): string {
  		if (!this.token) {
  			this.token = localStorage.getItem('user-token');
  		}
  		return this.token;
  	}

  	public logout(): void {
  		this.token = '';
  		window.localStorage.removeItem('user-token');
  		this.router.navigateByUrl('/login');
  	}

  	public getUser(): User {
  		const token = this.getToken();
  		let payload;
  		if (token) {
  			payload = token.split('.')[1];
  			payload = window.atob(payload);
  			return JSON.parse(payload);
  		} else {
  			return null;
  		}
  	}

  	public isLoggedIn(): boolean {
  		const user = this.getUser();
  		if (user) {
  			return user.exp > Date.now() / 1000;
  		}
  	}

  	public register(user: tokenPayload): Observable<any> {
  		return this.http.post('http://localhost:8080/api/register', user)
  			.pipe(
  				map((data: tokenResponse) => {
  					if (data.token) {
  						this.saveToken(data.token);
  					}
  				})
  			);
  	}

  	public login(user: tokenPayload): Observable<any> {
  		return this.http.post('http://localhost:8080/api/login', user)
  			.pipe(
  				map((data: tokenResponse) => {
  					if (data.token) {
  						this.saveToken(data.token);
  					}
  				})
  			);;
  	}

  	public profile(): Observable<any>{
  		return this.http.get('http://localhost:8080/api/profile')
  			.pipe(
  				map((data: tokenResponse) => {
  					if (data.token) {
  						this.saveToken(data.token);
  					}
  				})
  			);;
  	}
}