import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../_model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../_model";

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://angular8-1991.stackblitz.io/users/';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://angular8-1991.stackblitz.io/' + 'token/generate-token', loginPayload);
  }

  getUsers() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`/users/register`, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
