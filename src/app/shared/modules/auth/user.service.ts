import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { LoginRequest } from '../api/api.service';
import { NotificationService, Type } from '../notification/notification.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn = false;
  apiUrl: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private notifyService: NotificationService,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getUsername(): string {
    return this.getDecodedAccessToken(this.getAuthTokenRaw())['sub'];
  }

  login(request: LoginRequest): Observable<boolean> {
    return this.http.post<Response>(this.apiUrl + '/auth/login', request).pipe(
      map((response: any) => {
        this.loggedIn = true;
        this.setAuthToken(response.token);
        this.setRefreshToken(response.refresh_token);
        return true;
      }),
      catchError((error) => {
        let errorMsg;
        if (error.status == 0) {
          errorMsg = 'Server is not running';
        } else {
          // server is running and returned a json string
          errorMsg = error.statusText;
        }
        return throwError(errorMsg || 'Server error');
      }),
    );
  }

  /** logs out the user */
  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('api_token');
    localStorage.removeItem('api_refresh_token');
    this.router.navigate(['/'], { replaceUrl: true });
  }

  /** true if the user is logged in */
  isLoggedIn(): boolean {
    if (this.checkIfTokenExists('api_token')) {
      return !this.isTokenExpired(this.getAuthTokenRaw());
    }
    return false;
  }

  /** true if the refresh token is still valid */
  canRefresh(): boolean {
    if (this.checkIfTokenExists('api_token')) {
      return !this.isTokenExpired(this.getRefreshTokenRaw());
    }
    return false;
  }

  /** stores the auth token*/
  setAuthToken(token: string): void {
    localStorage.setItem('api_token', token);
  }

  /** stores the refresh token*/
  setRefreshToken(token: string): void {
    localStorage.setItem('api_refresh_token', token);
  }

  private tryTokenRenewal(): Observable<boolean> {
    const refreshToken = this.getRefreshTokenRaw();
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + refreshToken,
      }),
    };

    return this.http.post(this.apiUrl + '/auth/refresh', {}, requestOptions).pipe(
      map((response: any) => {
        this.setAuthToken(response.token);
        return true;
      }),
      catchError((error) => {
        this.notifyService.notify(Type.error, error.error.message);
        return throwError(error || 'Server error');
      }),
    );
  }

  renewToken(): Observable<boolean> {
    return this.tryTokenRenewal().pipe(
      map(() => {
        return true;
      }),
      catchError((error: Error) => {
        this.redirectToLogin();
        return of(false);
      }),
    );
  }

  redirectToLogin(): void {
    this.notifyService.notify(Type.error, 'Your session has expired.');
    this.logout();
    this.router.navigate(['/']);
  }

  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  /** returns the auth token stored in localStorage */
  getAuthTokenRaw(): string {
    return this.getJWTTokenRaw('api_token');
  }

  /** returns the refresh token stored in localStorage */
  getRefreshTokenRaw(): string {
    return this.getJWTTokenRaw('api_refresh_token');
  }

  getJWTTokenRaw(key: string): string {
    if (this.checkIfTokenExists(key)) {
      return localStorage.getItem(key)!;
    } else {
      throwError('No refresh token found');
      return '';
    }
  }

  checkIfTokenExists(key: string) {
    const token = localStorage.getItem(key);
    return !(token == null || token.split('.').length !== 3);
  }

  private getTokenExpirationDate(token: any) {
    const decoded = this.getDecodedAccessToken(token);

    if (typeof decoded.exp === 'undefined') {
      return null;
    }

    return new Date(0).setUTCSeconds(decoded.exp);
  }

  isTokenExpired(token: any) {
    const d = this.getTokenExpirationDate(token);
    if (d === null) {
      return false;
    }
    // Token expired?
    return !(d.valueOf() > new Date().valueOf());
  }

  /**
   * Service to manage the secret key provided to a new cluster to be attached to the Root Orchestrator
   * **/

  /** stores the cluster key*/
  setClusterKey(key: string): void {
    localStorage.setItem('cluster_key', key);
  }

  /** returns the cluster key stored in localStorage -> right now not used because the key is not stored */
  getClusterKey(): string {
    let key;
    if (this.loggedIn) {
      if (this.checkIfTokenExists('cluster_key')) {
        key = localStorage.getItem('cluster_key')!;
        if (!this.isTokenExpired(key)) return key;
        else {
          throwError('The token is already expired');
          return '';
        }
      } else {
        throwError('No cluster token found');
        return '';
      }
    }
    throwError('Session expired, please log in again');
    return '';
  }

  addCluster(cluster_info: any): Observable<string> {
    if (this.loggedIn) {
      return this.http.post<Response>(this.apiUrl + '/cluster/add', cluster_info).pipe(
        map((response: any) => {
          this.loggedIn = true;
          this.setClusterKey(response.secret_key);
          return response;
        }),
        catchError((error: any) => {
          let errorMsg;
          if (error.status == 0) {
            // server is not running
            errorMsg = 'Server is not running';
          } else {
            // server is running and returned a json string
            errorMsg = error.statusText;
          }
          return throwError(errorMsg || 'Server error');
        }),
      );
    }
    this.logout();
    return throwError('Session expired, please log in again');
  }
}
