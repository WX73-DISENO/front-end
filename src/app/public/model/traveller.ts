export class Traveller {
  id_traveller: string;
  name: string;
  lastName: string;
  birthdate: string;
  phone: string;
  email: string;
  password: string;
  photoUrl: string;

  constructor(id_traveller: string, name: string, lastName: string, birthdate: string, phone: string, email: string, password: string, photoUrl: string ) {
    this.id_traveller = id_traveller;
    this.name = name;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.photoUrl = photoUrl;
  }
}
