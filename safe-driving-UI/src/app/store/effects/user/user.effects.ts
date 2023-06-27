import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UsersetingsService } from 'src/app/services/user/usersetings.service';

import {
    UserActionTypes,
    getUserDetails,
} from '../../actions/user/user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UsersetingsService
    ) {}

    getUserRoles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserDetails),
            exhaustMap(() =>
                this.userService.getUserSettings().pipe(
                    map((userData) => {
                        return {
                            type: UserActionTypes.SET_USER_DETAILS_SUCCESS,
                            userDetails: userData,
                        };
                    }),
                    catchError((error) =>
                        of({
                            type: UserActionTypes.SET_USER_DETAILS_FAILURE,
                            error: error,
                        })
                    )
                )
            )
        )
    );
}
