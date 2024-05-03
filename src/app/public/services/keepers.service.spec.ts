import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KeepersService } from './keepers.service';
import { keepers } from '../model/keepers';

describe('KeepersService', () => {
  let service: KeepersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KeepersService]
    });

    service = TestBed.inject(KeepersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should register a keeper', () => {
    const mockKeeper: keepers = {
      id: 1,
      name: 'John Doe',
      country: 'Country',
      city: 'City',
      streetAddress: 'Street Address',
      email: 'john@example.com',
      description: 'Description',
      password: 'password',
      photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      rating : 5
    };

    service.registerKeeper(mockKeeper).subscribe(keeper => {
      expect(keeper).toEqual(mockKeeper);
    });

    const req = httpMock.expectOne('https://fake-api-kappa-eight.vercel.app/keepers');
    expect(req.request.method).toBe('POST');
    req.flush(mockKeeper);
  });

  it('should get a keeper', () => {
    const mockKeeper: keepers = {
      id: 1,
      name: 'John Doe',
      country: 'Country',
      city: 'City',
      streetAddress: 'Street Address',
      email: 'john@example.com',
      description: 'Description',
      password: 'password',
      photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      rating : 5
    };

    service.getKeeper('1').subscribe(keeper => {
      expect(keeper).toEqual({ success: true, user: mockKeeper });
    });

    const req = httpMock.expectOne('https://fake-api-kappa-eight.vercel.app/keepers?id=1');
    expect(req.request.method).toBe('GET');
    req.flush([mockKeeper]);
  });

  it('should update a keeper', () => {
    const mockKeeper: keepers = {
      id: 1,
      name: 'John Doe',
      country: 'Country',
      city: 'City',
      streetAddress: 'Street Address',
      email: 'john@example.com',
      description: 'Description',
      password: 'password',
      photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      rating : 5
    };

    service.updateKeeper(mockKeeper).subscribe(keeper => {
      expect(keeper).toEqual(mockKeeper);
    });

    const req = httpMock.expectOne(`https://fake-api-kappa-eight.vercel.app/keepers/${mockKeeper.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockKeeper);
  });

  it('should get all keepers', () => {
    const mockKeepers: keepers[] = [
    ];

    service.getKeepers().subscribe(keepers => {
      expect(keepers).toEqual(mockKeepers);
    });

    const req = httpMock.expectOne('https://fake-api-kappa-eight.vercel.app/keepers');
    expect(req.request.method).toBe('GET');
    req.flush(mockKeepers);
  });
});
