import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = '/taskapi';
  constructor(private http: HttpClient) {}
  async post(token: string, body: any) {
    try {
      return await firstValueFrom(
        this.http.post<any>(this.baseUrl, JSON.stringify(body), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
}
