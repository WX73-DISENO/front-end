import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Travellers} from "../../../model/travellers";
import {TravellersService} from "../../../services/travellers.service";

@Component({
  selector: 'app-register-traveller',
  templateUrl: './register-traveller.component.html',
  styleUrls: ['./register-traveller.component.css']
})
export class RegisterTravellerComponent {
  id = 0;
  name = '';
  lastName= '';
  birthdate = new Date();
  phone = '';
  email = '';
  password = '';
  repeat_password = '';

  constructor(private router: Router, private travellerServices: TravellersService) {}

  goToLogin() {
    this.getID();
  }
  goToRegisterKeeper(){
    this.router.navigateByUrl('/register-keeper');
  }


  getID(): void {
    this.travellerServices.getTravellers().subscribe({
      next: (user) => {
        this.id = user.length + 1;
        console.log('ID obtenido', this.id);
        // Crear el keeper y registrar después de obtener el ID
        const traveller = new Travellers(this.id, this.name, this.lastName, this.birthdate, this.phone, this.email, this.password);
        this.registerTravellers(traveller);
      },
      error: (error) => {
        console.log('Error al obtener los keepers', error.error.message);
      }
    });
  }

  registerTravellers(traveller: Travellers): void {
    this.travellerServices.registerTraveller(traveller).subscribe({
      next: (user) => {
        console.log('Usuario registrado', user);
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.log('Error al registrar', error.error.message);
      }
    });
  }


  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.router.navigate(['']).then();
    console.log("Signed Out");
  }
}
