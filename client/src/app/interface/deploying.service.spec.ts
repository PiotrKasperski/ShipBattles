import {TestBed} from '@angular/core/testing';

import {DeployingService} from './deploying.service';

describe('DeployingService', () => {
  let service: DeployingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeployingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
