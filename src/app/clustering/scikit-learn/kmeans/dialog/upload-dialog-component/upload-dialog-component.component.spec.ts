import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDialogComponentComponent } from './upload-dialog-component.component';

describe('UploadDialogComponentComponent', () => {
  let component: UploadDialogComponentComponent;
  let fixture: ComponentFixture<UploadDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
