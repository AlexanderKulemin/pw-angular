import { getUserInfo } from './actions';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { UserData } from '../models';

@State<UserData | null>({
  name: 'user',
  defaults: null
})

@Injectable()
export class UserState {
  @Action(getUserInfo)
  getUserInfo(ctx: StateContext<UserData>, action: getUserInfo) {
    const state = ctx.getState();
    ctx.patchState({
      name: 'Alex'
    })
  }
}
