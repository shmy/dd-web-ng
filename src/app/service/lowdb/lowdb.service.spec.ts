import { TestBed } from '@angular/core/testing';

import { LowdbService } from './lowdb.service';

describe('LowdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LowdbService = TestBed.get(LowdbService);
    expect(service).toBeTruthy();
  });
});
