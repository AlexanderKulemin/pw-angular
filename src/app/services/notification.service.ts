import { Injectable, EventEmitter } from '@angular/core';
import {of} from 'rxjs';
import { timeout } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public message: string = '';
  public showMessage: EventEmitter<{message?: string, isShow: boolean, isError?: boolean}> = new EventEmitter();

  constructor() { }

  show(message: string) {
    this.message = message;
    this.showMessage.emit({
      message,
      isShow: true
    });

    setTimeout(() => {
      this.clear();
    }, 5000)
  }

  showError(message: string) {
    this.message = message;
    this.showMessage.emit({
      message,
      isShow: true,
      isError: true,
    });

    setTimeout(() => {
      this.clear();
    }, 5000)
  }

  clear() {
    this.message = '';
    this.showMessage.emit({isShow: false, isError: false});
  }
}
