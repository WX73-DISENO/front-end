import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UpdateProfileComponent} from "../../update-profile/update-profile.component";
import {formatDate} from "@angular/common";
import {TravellersService} from "../../../services/travellers.service";
import {Travellers} from "../../../model/travellers";

@Component({
  selector: 'app-profile-traveler',
  templateUrl: './profile-traveler.component.html',
  styleUrls: ['./profile-traveler.component.css']
})
export class ProfileTravelerComponent implements OnInit{
  name: string;
  lastName: string;
  birthdate: Date;
  phone: string;
  email: string;

  constructor(private router: Router, private dialog: MatDialog, private travellersService: TravellersService) {
    this.name = '';
    this.lastName = '';
    this.birthdate = new Date();
    this.phone = '';
    this.email = '';
  }

  getFormattedBirthdate(): string {
    return formatDate(this.birthdate, 'dd-MM-yyyy', 'en-US');
  }
  goToTraveler(){
    this.router.navigateByUrl('/home-traveller');
  }
  goToFindKeeper(){
    this.router.navigateByUrl('/find-keeper');
  }
  goToMessenger(){
    this.router.navigateByUrl('/messenger-traveler');
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }

  goToProfile(){
    this.router.navigateByUrl('/profile-traveler');
  }

  ngOnInit(): void {
    this.travellersService.userId$.subscribe(userId => {
      if (userId) {
        this.loadTravellerDetails(userId);
      } else {
        console.log('User ID not available');
      }
    });
  }

  private loadTravellerDetails(userId: string) {
    this.travellersService.getTraveller(userId).subscribe({
      next: (result) => {
        if (result.success) {
          this.name = result.user.name;
          this.lastName = result.user.lastName;
          this.birthdate = result.user.birthdate;
          this.phone = result.user.phone;
          this.email = result.user.email;

        } else {
          console.log('Error al obtener el usuario');
        }
      },
      error: (err) => {
        console.error('Error fetching keeper details:', err);
      }
    });
  }

  updateProfile(name: string, lastName: string, birthdate: Date, phone: string, email: string): void {
    this.travellersService.userId$.subscribe(userId => {
      if (userId) {
        this.travellersService.getTraveller(userId).subscribe({
          next: (result) => {
            if (result.success) {

              if(name === '') {
                name = result.user.name;
              }
              if(lastName === '') {
                lastName = result.user.lastName;
              }
              if(birthdate === null) {
                birthdate = result.user.birthdate;
              }
              if(phone === '') {
                phone = result.user.phone;
              }
              if(email === '') {
                email = result.user.email;
              }
              const traveller = new Travellers(result.user.id, name, lastName, birthdate, phone, email, result.user.password);
              this.travellersService.updateTraveller(traveller).subscribe({
                next: (result) => {
                  if (result) {
                    console.log('Usuario actualizado');
                  } else {
                    console.log('Error al actualizar el usuario');
                  }
                },
                error: (err) => {
                  console.error('Error updating keeper:', err);
                }
              });
            } else {
              console.log('Error al obtener el usuario');
            }
          },
          error: (err) => {
            console.error('Error fetching keeper details:', err);
          }
        });
      } else {
        console.log('User ID not available');
      }
    });
  }

  openUpdateDialog(): void {
    const formattedBirthdate = this.getFormattedBirthdate();
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '500px',
      data: { name: this.name, lastName: this.lastName, birthdate: this.birthdate, phone: this.phone, email: this.email }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.name = result.name;
        this.lastName = result.lastName;
        this.birthdate = result.birthdate;
        this.phone = result.phone;
        this.email = result.email;

        this.updateProfile(result.name, result.lastName, result.birthdate, result.phone, result.email);
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
