import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGPComponent } from './pie-gp.component';

describe('PieGPComponent', () => {
  let component: PieGPComponent;
  let fixture: ComponentFixture<PieGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieGPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
