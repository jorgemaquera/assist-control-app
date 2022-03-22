import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root',
})
export class SecureLsService {
  private _ls = new SecureLS();

  constructor() {}

  public getItem(key: string) {
    return this._ls.get(key);
  }

  public setItem(key: string, value: any) {
    this._ls.set(key, value);
  }

  public removeItem(key: string) {
    this._ls.remove(key);
  }
}
