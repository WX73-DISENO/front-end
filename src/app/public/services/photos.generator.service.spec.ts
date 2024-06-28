import { TestBed } from '@angular/core/testing';

import { PhotosGeneratorService } from './photos.generator.service';

describe('PhotosGeneratorService', () => {
  let service: PhotosGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotosGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
