import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEspacioComponent } from './form-espacio.component';

describe('FormEspacioComponent', () => {
  let component: FormEspacioComponent;
  let fixture: ComponentFixture<FormEspacioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEspacioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
