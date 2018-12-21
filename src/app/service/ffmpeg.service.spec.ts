import { TestBed } from '@angular/core/testing';

import { FfmpegService } from './ffmpeg.service';

describe('FfmpegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FfmpegService = TestBed.get(FfmpegService);
    expect(service).toBeTruthy();
  });
});
