import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl: any = environment.baseUrlWoke + "UserAuths"
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  
  register(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${baseUrl}/users`, data);
  }

}
