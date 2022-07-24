import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authHeaders = request.headers.set(environment.nsSubscription.key, environment.nsSubscription.value);
    const newRequest = request.clone({ headers: authHeaders });

    if (newRequest.method !== 'GET') {
      return next.handle(newRequest);
    }

    const cachedResponse = this.cache.get(newRequest.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(newRequest).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(newRequest.url, event);
        }
      })
    );
  }
}
