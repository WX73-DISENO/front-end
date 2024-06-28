import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseService} from "../../shared/base.service";
import {MensajeriaTraveller} from "../model/mensajeriaTraveller";
import {PhotosResponse} from "../model/photo";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotosGeneratorService extends BaseService<PhotosResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/photos';
  }

  baseUrl = 'http://localhost:8080/api/v1/photos';

  getOriginalPhotoUrls(query: string, perPage: number): Observable<string[]> {
    let params = new HttpParams()
      .set('query', query)
      .set('perPage', perPage.toString());

    return this.http.get<PhotosResponse>(this.baseUrl, { params }).pipe(
      map((response: PhotosResponse) => {
        return response.photos.map(photo => photo.src.original);
      })
    );
  }
}
