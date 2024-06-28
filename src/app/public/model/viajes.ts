export class Viajes {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  rating: number;
  price: number;
  photos: string[]; // Nuevo campo para almacenar las URLs de las imágenes adicionales

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.photoUrl = '';
    this.price = 0;
    this.rating = 0;
    this.photos = [];
  }
}

