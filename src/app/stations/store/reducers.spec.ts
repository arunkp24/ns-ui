import { initialState, reducers } from './reducers';
import * as StationsActions from './actions';
import { StationInterface } from '../types/station.interface';
import { StationErrorInterface } from '../types/stationError.interface';

describe('Stations Reducer', () => {
    test('should return initial state', () => {
        const action = { type: 'NOOP' } as any;
        const result = reducers(initialState, action);

        expect(result).toBe(initialState);
    });

    test('should set isLoading as true', () => {
        const action = StationsActions.getStations();
        const result = reducers(initialState, action);

        expect(result.isLoading).toBe(true);
    });

    test('should set isLoading as false and set stations', () => {
        const stations: StationInterface[] = [
            {
                code: 'GVC',
                name: 'Den Haag'
            }
        ];
        const action = StationsActions.getStationsSuccess({stations});
        const result = reducers(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.stations).toBe(stations);
    });

    test('should set isLoading as false and set errors', () => {
        const error: StationErrorInterface = {
            message: 'error',
            statusCode: 404
        };
        const action = StationsActions.getStationsFailure({error});
        const result = reducers(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.error).toBe(error);
    });
});