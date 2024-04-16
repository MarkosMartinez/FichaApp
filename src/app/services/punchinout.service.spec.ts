import { TestBed } from '@angular/core/testing';

import { PunchinoutService } from './punchinout.service';

describe('PunchinoutService', () => {
  let service: PunchinoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PunchinoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
