import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDireccionComponent } from './form-direccion.component';

describe('FormDireccionComponent', () => {
  let component: FormDireccionComponent;
  let fixture: ComponentFixture<FormDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
