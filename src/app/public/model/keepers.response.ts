export class KeepersResponse {
  id: number;
  password: string;
  name: string;
  country: string;
  city: string;
  streetAddress: string;
  email: string;
  description: string;
  photoUrl: string;
  rating: number;


  constructor(id: number = 0, name: string = '', country: string = '', city: string = '', streetAddress: string = '', email: string = '', description: string = '', password: string = '') {
    this.id = id;
    this.password = password;
    this.name = name;
    this.country = country;
    this.city = city;
    this.streetAddress = streetAddress;
    this.description = description;
    this.email = email;
    this.photoUrl = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";
    this.rating = 5;
  }
}
