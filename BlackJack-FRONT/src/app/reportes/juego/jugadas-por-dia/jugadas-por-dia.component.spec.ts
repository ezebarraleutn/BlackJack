import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadasPorDiaComponent } from './jugadas-por-dia.component';

describe('JugadasPorDiaComponent', () => {
  let component: JugadasPorDiaComponent;
  let fixture: ComponentFixture<JugadasPorDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadasPorDiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadasPorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
