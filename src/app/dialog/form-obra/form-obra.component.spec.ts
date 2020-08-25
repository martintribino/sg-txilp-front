import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObraComponent } from './form-obra.component';

describe('FormObraComponent', () => {
  let component: FormObraComponent;
  let fixture: ComponentFixture<FormObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
