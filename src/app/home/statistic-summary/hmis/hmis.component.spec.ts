import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmisComponent } from './hmis.component';

describe('HmisComponent', () => {
  let component: HmisComponent;
  let fixture: ComponentFixture<HmisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
