import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {Travellers} from "../model/travellers";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {keepers} from "../model/keepers";

@Injectable({
  providedIn: 'root'
})
export class TravellersService extends BaseService<Travellers>{
  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/travellers';
  }
  lastID: any;

  baseUrl = 'https://fake-api-kappa-eight.vercel.app/travellers';

  private userIdSource = new BehaviorSubject<string | null>(null);

  userId$ = this.userIdSource.asObservable();

  authenticate(email: string, password: string) {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length) {
          return { success: true, user: users[0] };
        } else {
          return { success: false };
        }
      })
    );
  }
  setUserId(id: string) {
    this.userIdSource.next(id);
  }

  clearUserId() {
    this.userIdSource.next(null);
  }

  getTraveller(id: string) {
    return this.http.get<any[]>(`${this.baseUrl}?id=${id}`).pipe(
      map(users => {
        if (users.length) {
          return { success: true, user: users[0] };
        } else {
          return { success: false };
        }
      })
    );
  }

  registerTraveller(traveller: Travellers) {
    return this.http.post(`${this.baseUrl}`, traveller);
  }

  getTravellers() {
    return this.http.get<Travellers[]>(`${this.baseUrl}`);
  }

  updateTraveller(travellers: Travellers) {
    return this.http.put(`${this.baseUrl}/${travellers.id}`, travellers);
  }
}
