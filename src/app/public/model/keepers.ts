export class keepers {
  id: number;
  name: string;
  country: string;
  city: string;
  streetAddress: string;
  email: string;
  description: string;
  password: string;
  photoUrl: string;
  rating: number;


  constructor(id: number, name: string, country: string, city: string, streetAddress: string, email: string, description: string, password: string) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.city = city;
    this.streetAddress = streetAddress;
    this.description = description;
    this.password = password;
    this.email = email;
    this.photoUrl = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";
    this.rating = 5;
  }
}
