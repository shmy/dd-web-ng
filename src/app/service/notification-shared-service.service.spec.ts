import { TestBed } from '@angular/core/testing';

import { NotificationSharedServiceService } from './notification-shared-service.service';

describe('NotificationSharedServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationSharedServiceService = TestBed.get(NotificationSharedServiceService);
    expect(service).toBeTruthy();
  });
});
