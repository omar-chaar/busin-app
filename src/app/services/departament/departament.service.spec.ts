import { TestBed } from '@angular/core/testing';

import { DepartamentService } from './departament.service';

describe('DepartamentService', () => {
  let service: DepartamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
