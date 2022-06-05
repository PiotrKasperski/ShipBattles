import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DragBoardComponent} from './drag-board.component';

describe('DragBoardComponent', () => {
  let component: DragBoardComponent;
  let fixture: ComponentFixture<DragBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragBoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.ships).toBeTruthy();
    expect(component.width).toBeTruthy();
    expect(component.height).toBeTruthy();
  });
});
