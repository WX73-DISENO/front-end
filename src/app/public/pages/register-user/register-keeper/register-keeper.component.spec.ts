import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterKeeperComponent } from './register-keeper.component';
import { KeepersService } from '../../../services/keepers.service';
import { of } from 'rxjs';

describe('RegisterKeeperComponent', () => {
  let component: RegisterKeeperComponent;
  let fixture: ComponentFixture<RegisterKeeperComponent>;
  let mockKeepersService: any;

  beforeEach(() => {
    mockKeepersService = jasmine.createSpyObj(['getKeepers', 'registerKeeper']);

    TestBed.configureTestingModule({
      declarations: [RegisterKeeperComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: KeepersService, useValue: mockKeepersService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterKeeperComponent);
    component = fixture.componentInstance;
  });

  it('should register keeper', fakeAsync(() => {
    // Mock data
    const keeperData = {
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

    // Set component properties
    component.id = 1; // Assuming ID is 1
    component.name = keeperData.name;
    component.country = keeperData.country;
    component.city = keeperData.city;
    component.streetAddress = keeperData.streetAddress;
    component.email = keeperData.email;
    component.description = keeperData.description;
    component.password = keeperData.password;
    component.repeat_password = keeperData.password;


    // Mock service method
    mockKeepersService.registerKeeper.and.returnValue(of(keeperData));

    // Call registerKeepers() method
    component.registerKeepers(keeperData);

    // Ensure service method is called with correct data
    expect(mockKeepersService.registerKeeper).toHaveBeenCalledWith(keeperData);

    // Use fakeAsync and tick to wait for asynchronous operation
    tick();

    // Expect navigation after registration
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/login');
  }));
});

