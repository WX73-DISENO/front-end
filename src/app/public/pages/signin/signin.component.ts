import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {keepers} from "../../model/keepers";
import {KeepersService} from "../../services/keepers.service";
import {Travellers} from "../../model/travellers";
import {TravellersService} from "../../services/travellers.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  Keepers: keepers[] = [];
  correo_electronico: any;
  contrasena: any;
  selectedUserType: 'keeper' | 'traveller' | null = null;

  constructor(private router: Router, private keepersService: KeepersService, private travellerService: TravellersService){}
  goToRegister(){
    this.router.navigateByUrl('/register-keeper');
  }

  goToKeeper(){
    this.router.navigateByUrl('/home-keeper');
  }

  goToTraveller(){
    this.router.navigateByUrl('/home-traveller');
  }

  selectUserType(type: 'keeper' | 'traveller') {
    this.selectedUserType = type;
  }

  login(){
    console.log(this.selectedUserType, this.contrasena, this.correo_electronico);
    if(this.selectedUserType == 'keeper'){
      this.keepersService.authenticate(this.correo_electronico, this.contrasena).subscribe({
        next: (result) => {
          if (result.success) {
            console.log('Usuario autenticado', result.user, result.user.id);
            this.keepersService.setUserId(result.user.id);
            this.goToKeeper();
          } else {
            console.log('Error de autenticación');
          }
        }
      });
    }
    else if(this.selectedUserType == 'traveller') {
      this.travellerService.authenticate(this.correo_electronico, this.contrasena).subscribe({
      next: (result) => {
        if (result.success) {
          console.log('Usuario autenticado', result.user, result.user.id);
          this.travellerService.setUserId(result.user.id);
          this.goToTraveller();
        } else {
          console.log('Error de autenticación');
        }
      }
    });
    }
  }
}
