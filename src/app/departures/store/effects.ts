import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, catchError, of, map, withLatestFrom } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { DepartureService } from '../services/departures.service';
import * as DeparturesActions from './actions';

@Injectable()
export class DeparturesEffects {
    constructor(private actions$: Actions, private departureService: DepartureService, private store$: Store<AppStateInterface>) {}

    getDepartures$ = createEffect(() => 
        this.actions$.pipe(
            ofType(DeparturesActions.getDepartures),
            withLatestFrom(this.store$.select(state => state.departures.station)),
            mergeMap(([action, departureStation]) => {
                return this.departureService.getDepartures(departureStation as string).pipe(
                    map((departures) => DeparturesActions.getDeparturesSuccess({departures})),
                    catchError((error) => { 
                        const errObj = {
                            statusCode: error.error.code,
                            message: error.error.message
                        };
                        return of(DeparturesActions.getDeparturesFailure({error: errObj}))
                    })
                );
            })
        )
    );
}