import { TestBed } from '@angular/core/testing';

import { AsideService } from './aside.service';

describe('AsideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsideService = TestBed.get(AsideService);
    expect(service).toBeTruthy();
  });
});
