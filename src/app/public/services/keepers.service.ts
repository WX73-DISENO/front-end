import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {keepers} from "../model/keepers";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {KeepersResponse} from "../model/keepers.response";
@Injectable({
  providedIn: 'root'
})
export class KeepersService extends BaseService<keepers>{
  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/keepers';
  }

  lastID: any;

  baseUrl = 'http://localhost:8080/api/v1/keepers';

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

  getKeeper(id: string) {
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

  registerKeeper(keeper: keepers) {
    return this.http.post(`${this.baseUrl}`, keeper);
  }

  getKeepers() {
    return this.http.get<keepers[]>(`${this.baseUrl}`);
  }

  updateKeeper(keeperResponse: KeepersResponse) {
    return this.http.put(`${this.baseUrl}/${keeperResponse.id}`, keeperResponse);
  }
}
