import { Component, OnInit } from '@angular/core';
import { ViewChangesService } from './../../services/view-changes.service';
import { AuthService } from './../../services/auth.service';
import { Store, Select } from '@ngxs/store';
import { getUserInfo } from '../../store/actions';
import { Observable } from 'rxjs';
import { UserState } from '../../store';
import { UserData } from '../../models';
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
    private viewChanges: ViewChangesService,
    private store: Store
  ) { }

  @Select(UserState)
  name$!: Observable<UserData>;

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

  getUser() {
    this.store.dispatch(new getUserInfo())
      .subscribe(resp => {
        console.log('Animals', resp);
    });
  }
}
