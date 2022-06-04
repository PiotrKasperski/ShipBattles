import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldComponent} from './field.component';
import {FieldState} from "../engine/field-state";
import {GameService} from "../engine/game.service";


describe('FieldComponent', () => {
  let component: FieldComponent;
  let mockGameService: GameService;


  let fixture: ComponentFixture<FieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldComponent],
      providers: [{provide: GameService, useValue: mockGameService}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change background', function () {
    expect(component.setBackground()).toEqual({'background': 'aqua'})
    component.field.state = FieldState.HITED;
    expect(component.setBackground()).toEqual({'background': 'red'})
    component.field.state = FieldState.SHIP;
    expect(component.setBackground()).toEqual({'background': 'grey'})
  });


});
