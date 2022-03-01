import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DBScanComponent } from './dbscan.component';

describe('DBScanComponent', () => {
  let component: DBScanComponent;
  let fixture: ComponentFixture<DBScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DBScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DBScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
