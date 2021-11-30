import { Component, OnInit } from '@angular/core';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public message: string = '';
  public isShowNote = false;
  public isError = false;

  constructor(
    private noteService: NotificationService
  ) { }

  ngOnInit(): void {
    this.noteService.showMessage.subscribe(resp => {
      if (resp.message) {
        this.message = resp.message;
      }


      this.isError = Boolean(resp.isError);
      this.isShowNote = resp.isShow;
    })
  }

  closeNote() {
    this.noteService.clear();
  }
}
