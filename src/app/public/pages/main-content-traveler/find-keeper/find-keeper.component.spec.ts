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

describe('FindKeeperComponent', () => {
  let component: FindKeeperComponent;
  let fixture: ComponentFixture<FindKeeperComponent>;
  let mockKeepersService: jasmine.SpyObj<KeepersService>;

  beforeEach(() => {
    mockKeepersService = jasmine.createSpyObj(['getAll']);

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
        NoopAnimationsModule
      ]
    });

    fixture = TestBed.createComponent(FindKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter keepers by country', () => {
    const keeper: keepers = {
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
    mockKeepersService.getAll.and.returnValue(of(keeper));
    component.ngOnInit();

    component.country = 'Country 1';
    component.onFilter();

    expect(component.keepers).toEqual([{
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
    }]);
  });

  it('should filter keepers by country', () => {
    const keeper: keepers = {
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
    mockKeepersService.getAll.and.returnValue(of(keeper));
    component.ngOnInit();

    component.country = 'Country 1';
    component.onFilter();

    expect(component.keepers).toEqual([{
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
    }]);
  });
});
