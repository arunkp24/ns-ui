import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, of, map } from 'rxjs';
import { DepartureService } from '../services/departures.service';
import * as DeparturesActions from './actions';

@Injectable()
export class DeparturesEffects {
    constructor(private actions$: Actions, private departureService: DepartureService) {}

    getDepartures$ = createEffect(() => 
        this.actions$.pipe(
            ofType(DeparturesActions.getDepartures),
            mergeMap(() => {
                return this.departureService.getDepartures('GVC').pipe(
                    map((departures) => DeparturesActions.getDeparturesSuccess({departures})),
                    catchError((error) => of(DeparturesActions.getDeparturesFailure({error: error.error})))
                );
            })
        )
    );
}