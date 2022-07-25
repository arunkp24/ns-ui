import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jest-marbles';
import { Observable, of } from 'rxjs';
import { StationService } from '../services/stations.service';
import { StationInterface } from '../types/station.interface';
import * as StationsActions from './actions';
import { StationsEffects } from './effects';

describe('Stations Effects', () => {
    let service: StationService;
    let effects: StationsEffects;
    let actions: Observable<any>;
    const fakeStations: StationInterface[] = [];
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StationsEffects,
                provideMockActions(() => actions),
                {
                    provide: StationService,
                    useValue: {
                        getStations: jest.fn().mockImplementationOnce(() => of(fakeStations))
                    }
                }
            ]
        });
        service = TestBed.inject(StationService);
        effects = TestBed.inject(StationsEffects);
    });

    test('should return an action of type getStationsSuccess', () => {
        const action = StationsActions.getStations();
        actions = hot('-a', {a: action});
        const completion = StationsActions.getStationsSuccess({ stations: fakeStations });
        const expected = cold('-b', {b: completion});

        expect(effects.getStations$).toBeObservable(expected);
    });
});
