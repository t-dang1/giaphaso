import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _message$ = new Subject();

  private isloginFlag = new Subject();

  constructor() {}

  public setMessage(msg: string) {
    this._message$.next(msg);
  }

  public getMessage(): Observable<any> {
    return this._message$.asObservable();
  }

  public getStatus(): Observable<any> {
    return this.isloginFlag.asObservable();
  }

  public setStatus(msg : any) {
    this.isloginFlag.next(msg);
  }

  public clearMessage() {
    this._message$.next('');
  }
}
