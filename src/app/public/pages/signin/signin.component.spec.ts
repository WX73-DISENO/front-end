import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";
import {KeepersService} from "../../services/keepers.service";
import { of, throwError } from 'rxjs';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let mockKeepersService: jasmine.SpyObj<KeepersService>;

  beforeEach(() => {
    mockKeepersService = jasmine.createSpyObj(['authenticate', 'setUserId']);

    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      providers: [
        { provide: KeepersService, useValue: mockKeepersService }
      ],
      imports: [RouterTestingModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule
      ]
    });

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect to /home-keeper on successful keeper login', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl');

    mockKeepersService.authenticate.and.returnValue(of({ success: true, user: {} }));

    component.correo_electronico = 'valid@email.com';
    component.contrasena = 'validPassword';
    component.selectedUserType = 'keeper';
    component.login();

    expect(navigateSpy).toHaveBeenCalledWith('/home-keeper');
  });

  it('should not redirect on login failure', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl');

    mockKeepersService.authenticate.and.returnValue(throwError(''));

    component.correo_electronico = 'invalidEmail';
    component.contrasena = 'wrongPassword';
    component.login();

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
