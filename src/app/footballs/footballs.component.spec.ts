import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballsComponent } from './footballs.component';

describe('FootballsComponent', () => {
  let component: FootballsComponent;
  let fixture: ComponentFixture<FootballsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FootballsComponent]
    });
    fixture = TestBed.createComponent(FootballsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
