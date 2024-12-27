import { TestBed } from '@angular/core/testing';

import { SeasonMetadataService } from './season-metadata.service';

describe('SeasonMetadataService', () => {
  let service: SeasonMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
