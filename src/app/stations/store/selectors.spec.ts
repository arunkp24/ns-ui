import { DepartureStateInterface } from 'src/app/departures/types/departuresState.interface';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { StationsStateInterface } from '../types/stationsState.interface';
import * as StationsSelectors from './selectors';

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
        const isLoading = StationsSelectors.isLoadingSelector(state);
        expect(isLoading).toBe(false);
    });
    it('should return stations', () => {
        const stations = StationsSelectors.stationsSelector(state);
        expect(stations.length).toBe(1);
    });
    it('should return erros as null', () => {
        const error = StationsSelectors.errorSelector(state);
        expect(error).toBe(null);
    });
});