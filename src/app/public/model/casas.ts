export class Casas {
  id: number;
  country: string;
  city: string;
  streetAddress: string;
  price: number;
  rating: number;
  photoUrl: string;
  capacity: number;
  photos: string[]; // Nuevo campo para almacenar las URLs de las imágenes adicionales

  constructor() {
    this.id = 0;
    this.country = '';
    this.city = '';
    this.photoUrl = '';
    this.price = 0;
    this.streetAddress = '';
    this.rating = 0;
    this.capacity = 0;
    this.photos = [];
  }
}
