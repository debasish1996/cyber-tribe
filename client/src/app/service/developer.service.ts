import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  constructor(private http: HttpClient) {}

  resetContact() {
    this.http.get('api/contacts/reset').subscribe();
  }
}
