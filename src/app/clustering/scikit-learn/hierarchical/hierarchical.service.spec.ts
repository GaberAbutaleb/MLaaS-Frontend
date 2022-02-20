import { TestBed } from '@angular/core/testing';
import { HierarchicalService } from './hierarchical.service';



describe('HierarchicalService', () => {
  let service: HierarchicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HierarchicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
