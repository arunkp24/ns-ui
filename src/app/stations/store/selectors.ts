import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.stations;

export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading);

export const stationsSelector = createSelector(selectFeature, (state) => state.stations);

export const errorSelector = createSelector(selectFeature, (state) => state.error);