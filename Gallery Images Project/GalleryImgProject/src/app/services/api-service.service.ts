import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomFile } from '../interface/customFile.interface';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  apiUrl = 'http://localhost:3000/images';

  constructor(private http: HttpClient) {}

  postImage(images: CustomFile) {
    return this.http.post<CustomFile>(this.apiUrl, images);
  }

  getAllImage() {
    return this.http.get<CustomFile[]>(this.apiUrl);
  }

  deleteImage(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
