import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtctComponent } from './pmtct.component';

describe('PmtctComponent', () => {
  let component: PmtctComponent;
  let fixture: ComponentFixture<PmtctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
