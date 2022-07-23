import { createAction, props } from '@ngrx/store';
import { StationInterface } from '../types/station.interface';
import { StationErrorInterface } from '../types/stationError.interface';

export const getStations = createAction('[Stations] Get Stations');

export const getStationsSuccess = createAction('[Stations] Get Stations Success', props<{stations: StationInterface[]}>());

export const getStationsFailure = createAction('[Stations] Get Stations Failure', props<{error: StationErrorInterface}>());