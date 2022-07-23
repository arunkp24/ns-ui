import { createReducer, on } from '@ngrx/store';
import { StatiosStateInterface } from '../types/stationsState.interface';
import * as StationsActions from './actions';

export const initialState: StatiosStateInterface = {
    isLoading: false,
    stations: [],
    error: null
};

export const reducers = createReducer(
    initialState,
    on(StationsActions.getStations, (state) => ({
        ...state,
        isLoading: true
    })),
    on(StationsActions.getStationsSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        stations: action.stations
    })),
    on(StationsActions.getStationsFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    }))
);