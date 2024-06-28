import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Viajes} from "../../../model/viajes";
import {ViajesService} from "../../../services/viajes.service";
import {PhotosGeneratorService} from "../../../services/photos.generator.service";

@Component({
  selector: 'app-keeper',
  templateUrl: './keeper.component.html',
  styleUrls: ['./keeper.component.css']
})
export class KeeperComponent implements OnInit {

  viajes: Viajes[] = [];
  title = '';

  constructor(
    private router: Router,
    private viajeService: ViajesService,
    private photoService: PhotosGeneratorService
  ) { }

  ngOnInit() {
    this.viajeService.getAll().subscribe((response: any) => {
      this.viajes = response;

      // Solicitar imágenes adicionales para cada viaje
      this.viajes.forEach(viaje => {
        this.photoService.getOriginalPhotoUrls(viaje.title, 3).subscribe(
          (urls: string[]) => {
            viaje.photos = urls;
          },
          error => {
            console.error('Error al obtener fotos:', error);
            viaje.photos = []; // Asegúrate de inicializar el campo photos
          }
        );
      });
    });
  }

  goToFindHouse() {
    this.router.navigateByUrl('/find-house');
  }

  goToMessenger() {
    this.router.navigateByUrl('/messenger-keeper');
  }

  goToProfile() {
    this.router.navigateByUrl('/profile-keeper');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.router.navigate(['']).then();
    console.log("Signed Out");
  }
}
