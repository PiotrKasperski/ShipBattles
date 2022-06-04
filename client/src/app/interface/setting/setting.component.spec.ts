import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingComponent} from './setting.component';
import {Router} from "@angular/router";

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;
  beforeEach(() => {
    const routerMock = {};
    TestBed.configureTestingModule({providers: [{provide: Router, useValue: routerMock}]})
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
