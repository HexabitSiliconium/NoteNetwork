import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Note {
	name: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class NoteService {

  constructor(private http: HttpClient) { }

  upload(note: Note): Observable<any> {
    const formData = new FormData();
    formData.append('image', note.image);
    formData.append('name', note.name);
    formData.append('description', note.description);
    formData.append('uploader', window.localStorage.getItem('username'));
    return this.http.post('http://localhost:8080/api/upload', formData)
  			.pipe(
  				map((res: Response) => {
            console.log(res);
  				})
  			);
  }

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/view-notes')
      .pipe(
        tap(data => {
          console.log("fetched notes");
        })
      );
  }
}
