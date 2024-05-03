import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseService } from './base.service';
import { environment } from "../../environments/environment.development";

describe('BaseService', () => {
  let service: BaseService<any>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseService]
    });

    service = TestBed.inject(BaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make a GET request to the correct URL when getAll is called', () => {
    service.getAll().subscribe();

    const req = httpMock.expectOne(`${environment.serverBasePath}/resources`);
    expect(req.request.method).toBe('GET');
  });
});
