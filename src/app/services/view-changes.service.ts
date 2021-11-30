import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ViewChangesService {
  public getBalance: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  setBalance(balance: number) {
    this.getBalance.next(balance);
  }
}
