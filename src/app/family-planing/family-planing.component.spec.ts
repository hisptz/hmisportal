import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPlaningComponent } from './family-planing.component';

describe('FamilyPlaningComponent', () => {
  let component: FamilyPlaningComponent;
  let fixture: ComponentFixture<FamilyPlaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyPlaningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
