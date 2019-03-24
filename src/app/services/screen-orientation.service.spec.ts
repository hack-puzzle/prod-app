import { TestBed } from '@angular/core/testing';

import { ScreenOrientationService } from './screen-orientation.service';

describe('ScreenOrientationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScreenOrientationService = TestBed.get(ScreenOrientationService);
    expect(service).toBeTruthy();
  });
});
