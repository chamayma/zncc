import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl: any = environment.baseUrlWoke + "UserAuths"
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${baseUrl}/login`, data);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}`);
  }

  updatesStatusData(id: number, post: any): Observable<any[]> {
    // return this.http.get<any[]>(`${baseUrl} /updateStatus/`);
    return this.http.put<any>(`${baseUrl}/updateStatus/${id}`, post);
  }
  addPost(post: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}`, post);
  }
}
