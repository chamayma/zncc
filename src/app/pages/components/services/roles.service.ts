import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl: any = environment.baseUrlWoke + "Roles"

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }


  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  addPost(post: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}`, post);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${id}`);
  }
}
