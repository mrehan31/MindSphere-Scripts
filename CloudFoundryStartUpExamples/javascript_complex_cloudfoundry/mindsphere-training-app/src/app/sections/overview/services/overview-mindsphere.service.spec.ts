import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { OverviewMindsphereService } from './overview-mindsphere.service';

describe('OverviewMindsphereService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: OverviewMindsphereService = TestBed.get(OverviewMindsphereService);
    expect(service).toBeTruthy();
  });
});
