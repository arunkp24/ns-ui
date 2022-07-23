import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, of, map } from 'rxjs';
import { StationService } from '../services/stations.service';
import * as StationsActions from './actions';

@Injectable()
export class StationsEffects {
    constructor(private actions$: Actions, private stationService: StationService) {}

    getStations$ = createEffect(() => 
        this.actions$.pipe(
            ofType(StationsActions.getStations),
            mergeMap(() => {
                return this.stationService.getStations().pipe(
                    map((stations) => StationsActions.getStationsSuccess({stations})),
                    catchError((error) => of(StationsActions.getStationsFailure({error: error.error})))
                );
            })
        )
    );
}