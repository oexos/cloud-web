import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../../model/data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private dataUrl = 'http://192.168.232.34:8082/two';
  private checkNameUrl = 'http://192.102.232.34:8082/two/name-check/';
  getData() {
    return this.http.get<Data[]>(this.dataUrl);
  }

  checkName(name: string) {
    return this.http.get<boolean>(this.checkNameUrl + name);
  }
}
