import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {KeepersService} from "../../../services/keepers.service";
import {keepers} from "../../../model/keepers";
import {coerceStringArray} from "@angular/cdk/coercion";

@Component({
  selector: 'app-register-keeper',
  templateUrl: './register-keeper.component.html',
  styleUrls: ['./register-keeper.component.css']
})
export class RegisterKeeperComponent {
  id= 0;
  name = '';
  country= '';
  city = '';
  streetAddress = '';
  email = '';
  description = '';
  password = '';
  repeat_password = '';

  constructor(private router: Router, private keepersService: KeepersService) {}

  goToLogin() {
    this.getID();
  }

  goToRegisterTraveller(){
    this.router.navigateByUrl('/register-traveller');
  }

  getID(): void {
    this.keepersService.getKeepers().subscribe({
      next: (user) => {
        this.id = user.length + 1;
        console.log('ID obtenido', this.id);
        // Crear el keeper y registrar después de obtener el ID
        const keeper = new keepers(this.id, this.name, this.country, this.city, this.streetAddress, this.email, this.description, this.password);
        this.registerKeepers(keeper);
      },
      error: (error) => {
        console.log('Error al obtener los keepers', error.error.message);
      }
    });
  }

  registerKeepers(keeper: keepers): void {
    this.keepersService.registerKeeper(keeper).subscribe({
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
