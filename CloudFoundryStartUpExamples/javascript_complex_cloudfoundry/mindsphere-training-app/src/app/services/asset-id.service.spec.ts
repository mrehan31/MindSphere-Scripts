import { TestBed } from '@angular/core/testing';

import { AssetIdService } from './asset-id.service';

describe('AssetIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetIdService = TestBed.get(AssetIdService);
    expect(service).toBeTruthy();
  });
});
