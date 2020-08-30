import { TestBed } from '@angular/core/testing';

import { MuiAngularService } from './mui-angular.service';

describe('MuiAngularService', () => {
  let service: MuiAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuiAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
