import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FindKeeperComponent } from './find-keeper.component';
import { KeepersService } from "../../../services/keepers.service";
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {keepers} from "../../../model/keepers";
import {MatInputModule} from "@angular/material/input";

describe('FindKeeperComponent', () => {
  let component: FindKeeperComponent;
  let fixture: ComponentFixture<FindKeeperComponent>;
  let mockKeepersService: jasmine.SpyObj<KeepersService>;

  beforeEach(() => {
    mockKeepersService = jasmine.createSpyObj('KeepersService', ['getAll']);

    TestBed.configureTestingModule({
      declarations: [FindKeeperComponent],
      providers: [
        { provide: KeepersService, useValue: mockKeepersService }
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatIconModule,
        NoopAnimationsModule,
        MatInputModule,
        MatFormFieldModule
      ]
    });

    fixture = TestBed.createComponent(FindKeeperComponent);
    component = fixture.componentInstance;
    mockKeepersService.getAll.and.returnValue(of([
      {
        id: 1,
        name: 'John Doe',
        country: 'Country 1',
        city: 'New York',
        streetAddress: '123 Apple St',
        email: 'john@example.com',
        description: 'Experienced pet keeper.',
        password: 'password123',
        photoUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
        rating: 5
      },
      {
        id: 2,
        name: 'Jane Doe',
        country: 'Country 1',
        city: 'Toronto',
        streetAddress: '456 Orange Rd',
        email: 'jane@example.com',
        description: 'Loving and caring pet sitter.',
        password: 'password456',
        photoUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135770.png",
        rating: 4
      }
    ]));
    fixture.detectChanges();
  });

  it('should filter keepers by country', () => {
    const keeper: keepers []= [
      {
      id: 1,
      name: 'John Doe',
      country: 'Country 1',
      city: 'City',
      streetAddress: 'Street Address',
      email: 'john@example.com',
      description: 'Description',
      password: 'password',
      photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      rating : 5
    }, {
        id: 2,
        name: 'Jane Doe',
        country: 'Country',
        city: 'City',
        streetAddress: 'Street Address',
        email: 'jane@example.com',
        description: 'Description',
        password: 'password',
        photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135770.png",
        rating : 4
      }];
    mockKeepersService.getAll.and.returnValue(of(keeper));
    component.ngOnInit();

    component.country = 'Country 1';
    component.onFilter();

    expect(component.keepers).toEqual([{
      id: 1,
      name: 'John Doe',
      country: 'Country 1',
      city: 'City',
      streetAddress: 'Street Address',
      email: 'john@example.com',
      description: 'Description',
      password: 'password',
      photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      rating : 5
    }]);
  });

  it('should filter keepers by country', () => {
    const keeper: keepers []= [{
      id: 1,
      name: 'John Doe',
      country: 'Country 1',
      city: 'City',
      streetAddress: 'Street Address',
      email: 'john@example.com',
      description: 'Description',
      password: 'password',
      photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      rating : 5
    }, {
      id: 2,
      name: 'Jane Doe',
      country: 'Country',
      city: 'City',
      streetAddress: 'Street Address',
      email: 'jane@example.com',
      description: 'Description',
      password: 'password',
      photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135770.png",
      rating : 4
    }];
    mockKeepersService.getAll.and.returnValue(of(keeper));
    component.ngOnInit();

    component.country = 'Country 1';
    component.onFilter();

    expect(component.keepers).toEqual([{
      id: 1,
      name: 'John Doe',
      country: 'Country 1',
      city: 'City',
      streetAddress: 'Street Address',
      email: 'john@example.com',
      description: 'Description',
      password: 'password',
      photoUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      rating : 5
    }]);
  });
});
