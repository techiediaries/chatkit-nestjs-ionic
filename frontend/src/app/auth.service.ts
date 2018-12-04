import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, private storage: Storage) { }

  register(userInfo: User): Observable<User> {
    return this.httpClient.post<User>(`${this.AUTH_SERVER}/register`, userInfo);
  }

  login(userInfo: User): Observable<any> {
    return this.httpClient.post(`${this.AUTH_SERVER}/login`, userInfo).pipe(
      tap(async (res: { status: number, access_token, expires_in, user_id }) => {
        if (res.status !== 404) {
          await this.storage.set("ACCESS_TOKEN", res.access_token);
          await this.storage.set("EXPIRES_IN", res.expires_in);
          await this.storage.set("USER_ID", res.user_id);
        }
      })
    );
  }

}
