import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserData } from 'src/app/useful/interfaces';
import * as fromUser from '../../reducers/user/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
    fromUser.userFeatureKey
);

export const userDetails = createSelector(
    selectUserState,
    (state: fromUser.UserState): UserData => state.userDetails
);

export const userRoles = createSelector(
    selectUserState,
    (state: fromUser.UserState): string[] => state.userDetails?.role[0].roleName
);
