import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceVictoriasComponent } from './indice-victorias.component';

describe('IndiceVictoriasComponent', () => {
  let component: IndiceVictoriasComponent;
  let fixture: ComponentFixture<IndiceVictoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiceVictoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiceVictoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
