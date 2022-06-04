import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameComponent} from './game.component';
import {Router} from "@angular/router";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  beforeEach(() => {
    const routerMock = {
      getCurrentNavigation: () => {
      },
      navigateByUrl: () => {
      },
    };
    TestBed.configureTestingModule({providers: [{provide: Router, useValue: routerMock}]})
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
