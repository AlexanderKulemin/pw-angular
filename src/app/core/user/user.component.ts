import { Component, OnInit } from '@angular/core';
import { ViewChangesService } from './../../services/view-changes.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public name = 'Parrot';
  public balance = 0;

  constructor(
    private authService: AuthService,
    private viewChanges: ViewChangesService
  ) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((data) => {
      const { name, balance } = data.user_info_token;
      this.name = name;
      this.balance = balance;

      this.viewChanges.setBalance(balance);

    }, (error) => console.log(error));

    this.subscribeChanges()
  }

  subscribeChanges() {
    this.viewChanges.getBalance.subscribe((balance: number) => {
      this.balance = balance;
    })
  }
}
