import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TravellersService } from './travellers.service';
import { Travellers } from '../model/travellers';

describe('TravellersService', () => {
  let service: TravellersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TravellersService]
    });

    service = TestBed.inject(TravellersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should fetch travellers', () => {
    const dummyTravellers: Travellers[] = [
      { id: 1,
        name: 'John',
        lastName: 'Doe',
        birthdate: new Date('1990-01-01'),
        phone: '1234567890',
        email: 'example1@gmail.com',
        password: 'password1',
        photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'
      },
      {
        id: 2,
        name: 'Jane',
        lastName: 'Doe',
        birthdate: new Date('1990-01-01'),
        phone: '1234567890',
        email: 'example2@gmail.com',
        password: 'password2',
        photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'
      }
    ];

    service.getTravellers().subscribe(travellers => {
      expect(travellers.length).toBe(2);
      expect(travellers).toEqual(dummyTravellers);
    });

    const req = httpMock.expectOne('https://fake-api-kappa-eight.vercel.app/travellers');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTravellers); // Provide dummy data as the response
  });
});
