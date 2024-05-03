import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { RouterTestingModule } from '@angular/router/testing';
import {Router} from "@angular/router";


describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninComponent]
    });
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect to /home-keeper on successful keeper login', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.correo_electronico = 'valid@email.com';
    component.contrasena = 'validPassword';
    component.selectedUserType = 'keeper';
    component.login();

    expect(navigateSpy).toHaveBeenCalledWith('/home-keeper');
  });

  it('should not redirect on login failure', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl');

    component.correo_electronico = 'invalidEmail';
    component.contrasena = 'wrongPassword';
    component.login();

    expect(navigateSpy).not.toHaveBeenCalled();
  });

});
