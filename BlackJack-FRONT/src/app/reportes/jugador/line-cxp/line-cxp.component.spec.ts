import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineCxpComponent } from './line-cxp.component';

describe('LineCxpComponent', () => {
  let component: LineCxpComponent;
  let fixture: ComponentFixture<LineCxpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineCxpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineCxpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
