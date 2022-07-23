import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.departures;

export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading);

export const departuresSelector = createSelector(selectFeature, (state) => state.departures);

export const errorSelector = createSelector(selectFeature, (state) => state.error);