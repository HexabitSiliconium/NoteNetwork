import { Component, inject } from '@angular/core';
import { LoginService } from './login.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NoteNetwork';
  constructor(public login: LoginService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
