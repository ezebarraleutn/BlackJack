import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromedioJugadasComponent } from './promedio-jugadas.component';

describe('PromedioJugadasComponent', () => {
  let component: PromedioJugadasComponent;
  let fixture: ComponentFixture<PromedioJugadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromedioJugadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromedioJugadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
