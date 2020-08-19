import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureImgComponent } from './secure-img.component';

describe('SecureImgComponent', () => {
  let component: SecureImgComponent;
  let fixture: ComponentFixture<SecureImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
