import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetasEntidadComponent } from './etiquetas-entidad.component';

describe('EtiquetasEntidadComponent', () => {
  let component: EtiquetasEntidadComponent;
  let fixture: ComponentFixture<EtiquetasEntidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetasEntidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetasEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
