import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEdicionComponent } from './form-edicion.component';

describe('FormEdicionComponent', () => {
  let component: FormEdicionComponent;
  let fixture: ComponentFixture<FormEdicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEdicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
