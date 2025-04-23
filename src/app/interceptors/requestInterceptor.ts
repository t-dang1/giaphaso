import { HttpClient, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap } from 'rxjs';

export function requestInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {

    const router = inject(Router);
    let reqWithHeader = req.clone();

    if (!reqWithHeader.body) {
      reqWithHeader = req.clone ( { body : {}} )
    }
    reqWithHeader.body['refreshToken'] = localStorage.getItem('refreshToken');

    if (sessionStorage.getItem('x_authorization')) {
      reqWithHeader = reqWithHeader.clone ( { headers : reqWithHeader.headers.append('x_authorization',  sessionStorage.getItem('x_authorization')!) } )
    }

    if (req.method.toLowerCase() === 'post') {
      if (!req.headers.get('isCustomType')) {
        reqWithHeader = reqWithHeader.clone( { headers : reqWithHeader.headers.append('Content-Type', 'application/json')});
      }
    }

    return next(reqWithHeader).pipe(
      map(event => {
        return event
      }),
      catchError((error : any) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            alert('Đã hết thời đăng nhập, hãy đăng nhập lại');
            sessionStorage.removeItem('status');
            localStorage.removeItem('tokenrefresh');
            router.navigate(['/login']);
          }


          return new Observable<HttpEvent<any>>
      }));

    // return next(reqWithHeader);
}
