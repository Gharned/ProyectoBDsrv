import { TestBed } from '@angular/core/testing';

import { RentService } from './rent.service';

describe('VehiclesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentService = TestBed.get(RentService);
    expect(service).toBeTruthy();
  });
});
