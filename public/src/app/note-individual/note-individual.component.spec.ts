import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteIndividualComponent } from './note-individual.component';

describe('NoteIndividualComponent', () => {
  let component: NoteIndividualComponent;
  let fixture: ComponentFixture<NoteIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
