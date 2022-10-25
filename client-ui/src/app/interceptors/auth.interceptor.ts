import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {catchError, Observable, switchMap} from 'rxjs';
import {BASE_ENDPOINT} from "../../common/constants";
import {AuthToken} from "./interfaces/auth-token.interface";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private apiPath = 'auth'

  constructor(private http: HttpClient) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('token');
    }
    if (!this.refreshToken) {
      this.refreshToken = localStorage.getItem('refreshToken');
    }
    if (this.accessToken) {
      request = this.setTokenOnRequest(request);
    }

    return next.handle(request).pipe(catchError(
      (err: HttpErrorResponse) => {
        if (err.status !== 401) {
          throw err;
        }

        return (this.refreshToken ? this.updateToken(this.refreshToken) : this.signUp())
          .pipe(switchMap((res) => {
            localStorage.setItem('token', res.accessToken);
            this.accessToken = res.accessToken;
            localStorage.setItem('refreshToken', res.refreshToken);
            this.refreshToken = res.refreshToken;

            const newRequest = this.setTokenOnRequest(request);
            return next.handle(newRequest);
          }))
      }));
  }

  setTokenOnRequest(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

  signUp() {
    return this.http.post<AuthToken>(`${BASE_ENDPOINT}/${this.apiPath}/sign-up`, {});
  }

  updateToken(refreshToken: string) {
    return this.http.post<AuthToken>(`${BASE_ENDPOINT}/${this.apiPath}/refresh`, {refreshToken})
  }
}
