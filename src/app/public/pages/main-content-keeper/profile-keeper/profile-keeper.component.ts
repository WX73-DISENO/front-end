import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { UpdateProfileComponent } from "../../update-profile/update-profile.component";
import { MatDialog } from "@angular/material/dialog";
import {KeepersService} from "../../../services/keepers.service";
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-profile-keeper',
  templateUrl: './profile-keeper.component.html',
  styleUrls: ['./profile-keeper.component.css']
})
export class ProfileKeeperComponent implements OnInit{
  name: string;
  country: string;
  city: string;
  description: string;
  email: string;
  userId = this.keepersService.userId$;

  constructor(private router: Router, private dialog: MatDialog, private keepersService: KeepersService) {
    this.name = '';
    this.country = '';
    this.city = '';
    this.description = '';
    this.email = '';
  }

  goToKeeper() {
    this.router.navigateByUrl('/home-keeper');
  }
  goToFindHouse() {
    this.router.navigateByUrl('/find-house');
  }
  goToMessenger() {
    this.router.navigateByUrl('/messenger-keeper');
  }

  ngOnInit(): void {
    this.keepersService.userId$.subscribe(userId => {
      if (userId) {
        this.loadKeeperDetails(userId);
      } else {
        console.log('User ID not available');
      }
    });
  }

  private loadKeeperDetails(userId: string) {
    this.keepersService.getKeeper(userId).subscribe({
      next: (result) => {
        if (result.success) {
          this.name = result.user.name;
          this.country = result.user.country;
          this.city = result.user.city;
          this.description = result.user.description;
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

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '500px',
      data: { name: this.name, country: this.country, city: this.city, description: this.description, email: this.email }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.name = result.name;
        this.country = result.lastName;
        this.city = result.birthdate;
        this.description = result.phone;
        this.email = result.email;
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
