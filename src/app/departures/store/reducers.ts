import { act } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';
import { DepartureStateInterface } from '../types/departuresState.interface';
import * as DeparturesActions from './actions';

export const initialState: DepartureStateInterface = {
    isLoading: false,
    station: null,
    departures: [],
    error: null
};

export const reducers = createReducer(
    initialState,
    on(DeparturesActions.getDepartures, (state, action) => ({
        ...state,
        isLoading: true,
        station: action.station
    })),
    on(DeparturesActions.getDeparturesSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        departures: action.departures
    })),
    on(DeparturesActions.getDeparturesFailure, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error
    }))
);