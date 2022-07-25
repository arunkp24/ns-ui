import { DepartureStateInterface } from 'src/app/departures/types/departuresState.interface';
import { StationsStateInterface } from 'src/app/stations/types/stationsState.interface';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { DepartureInterface } from '../types/departure.interface';
import * as DeparturesSelectors from './selectors';

describe('Stations Selectors', () => {
    const stationsState: StationsStateInterface = {
        isLoading: false,
        stations: [
            {
                code: 'GVC',
                name: 'Den Haag'
            }
        ],
        error: null
    };
    const departuresState: DepartureStateInterface = {
        isLoading: false,
        station: 'GVC',
        departures: [
            {
                time: '',
                category: 'Sprinter',
                direction: 'Hoorn',
                track: '1a'
            }
        ],
        error: null
    }
    let state: AppStateInterface;
    beforeEach(() => {
        state = {
            stations: stationsState,
            departures: departuresState
        };
    });
    it('should return isLoading as true', () => {
        const isLoading = DeparturesSelectors.isLoadingSelector(state);
        expect(isLoading).toBe(false);
    });
    it('should return departures', () => {
        const departures = DeparturesSelectors.departuresSelector(state);
        expect(departures.length).toBe(1);
    });
    it('should return errors as null', () => {
        const error = DeparturesSelectors.errorSelector(state);
        expect(error).toBe(null);
    });
});