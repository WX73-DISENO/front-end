import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import { FindKeeperComponent } from './find-keeper.component';
import {KeepersService} from "../../../services/keepers.service";
import{FormsModule} from "@angular/forms";
import {of} from "rxjs";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import { Router } from '@angular/router';
import {keepers} from "../../../model/keepers";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatIconModule} from "@angular/material/icon";

describe('FindKeeperComponent', () => {
  let component: FindKeeperComponent;
  let fixture: ComponentFixture<FindKeeperComponent>;
  let mockKeepersService: any;
  const mockKeepersData: keepers[] = [
    {
      id: 1,
      name: 'Keeper 1',
      country: 'Country 1',
      city: 'City 1',
      streetAddress: 'Address 1',
      email: '',
      description: 'Description 1',
      password: 'password1',
      photoUrl: 'https://example.com/photo1.jpg',
      rating: 4
    },
    {
      id: 2,
      name: 'Keeper 2',
      country: 'Country 2',
      city: 'City 2',
      streetAddress: 'Address 2',
      email: '',
      description: 'Description 2',
      password: 'password2',
      photoUrl: 'https://example.com/photo2.jpg',
      rating: 5
    }
  ];

  beforeEach(() => {
    mockKeepersService = jasmine.createSpyObj('KeepersService', ['getAll']);

    TestBed.configureTestingModule({
      declarations: [FindKeeperComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatIconModule
      ],
      providers: [
        { provide: KeepersService, useValue: mockKeepersService }
      ]
    });

    fixture = TestBed.createComponent(FindKeeperComponent);
    component = fixture.componentInstance;
    mockKeepersService.getAll.and.returnValue(of(mockKeepersData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load keepers on init', () => {
    expect(mockKeepersService.getAll).toHaveBeenCalled();
    expect(component.keepers).toEqual(mockKeepersData);
  });

  it('should filter keepers by country', () => {
    component.country = 'Country 1';
    component.onFilter();

    const filteredKeepers = mockKeepersData.filter(k => k.country === 'Country 1');

    expect(component.keepers).toEqual(filteredKeepers);
  });

  // Add more test cases for filtering by city, streetAddress, rating, etc.
});
