export class Travellers {
  id: number;
  name: string;
  lastName: string;
  birthdate: string;
  phone: string;
  email: string;
  password: string;
  photoUrl: string;

  constructor(id_traveller: number, name: string, lastName: string, birthdate: string, phone: string, email: string, password: string) {
    this.id = id_traveller;
    this.name = name;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.photoUrl = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";
  }
}
