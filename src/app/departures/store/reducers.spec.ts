import { initialState, reducers } from './reducers';
import * as DeparturesActions from './actions';
import { DepartureInterface } from '../types/departure.interface';
import { DepartureErrorInterface } from '../types/departureError.interface';

describe('Departures Reducer', () => {
    test('should return initial state', () => {
        const action = { type: 'NOOP' } as any;
        const result = reducers(initialState, action);

        expect(result).toBe(initialState);
    });

    test('should set isLoading as true and set station', () => {
        const station = 'GVC'
        const action = DeparturesActions.getDepartures({ station });
        const result = reducers(initialState, action);

        expect(result.isLoading).toBe(true);
        expect(result.station).toBe(station);
    });

    test('should set isLoading as false and set departures', () => {
        const departures: DepartureInterface[] = [
            {
                time: '',
                category: 'Sprinter',
                direction: 'Hoorn',
                track: '1a'
            }
        ];
        const action = DeparturesActions.getDeparturesSuccess({departures});
        const result = reducers(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.departures).toBe(departures);
    });

    test('should set isLoading as false and set errors', () => {
        const error: DepartureErrorInterface = {
            message: 'error',
            statusCode: 404
        };
        const action = DeparturesActions.getDeparturesFailure({error});
        const result = reducers(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.error).toBe(error);
    });
});