import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserModelsComponent } from './display-user-models.component';

describe('DisplayUserModelsComponent', () => {
  let component: DisplayUserModelsComponent;
  let fixture: ComponentFixture<DisplayUserModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayUserModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUserModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
