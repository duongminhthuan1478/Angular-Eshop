import { createAction, props } from '@ngrx/store';
import { User } from './../models/user.model';


export const buildUserSession = createAction('[Users] Build User Session');

export const buildUserSessionSuccess = createAction(
  '[Users] Build User Session Success',
  props<{ user: User }>()
);

export const buildUserSessionFailure = createAction('Users] Build User Session Failure');
