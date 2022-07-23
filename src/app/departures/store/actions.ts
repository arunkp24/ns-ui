import { createAction, props } from '@ngrx/store';
import { DepartureInterface } from '../types/departure.interface';
import { DepartureErrorInterface } from '../types/departureError.interface';

export const getDepartures = createAction('[Departures] Get Departures', props<{station: string}>());

export const getDeparturesSuccess = createAction('[Departures] Get Departures Success', props<{departures: DepartureInterface[]}>());

export const getDeparturesFailure = createAction('[Departures] Get Departures Failure', props<{error: DepartureErrorInterface}>());