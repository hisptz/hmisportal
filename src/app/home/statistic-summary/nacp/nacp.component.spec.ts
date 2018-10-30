import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NacpComponent } from './nacp.component';

describe('NacpComponent', () => {
  let component: NacpComponent;
  let fixture: ComponentFixture<NacpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NacpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NacpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
