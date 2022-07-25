import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { hot, cold } from 'jest-marbles';
import { Observable, of, throwError } from 'rxjs';
import { DepartureService } from '../services/departures.service';
import { DepartureInterface } from '../types/departure.interface';
import { DepartureStateInterface } from '../types/departuresState.interface';
import * as DeparturesActions from './actions';
import { DeparturesEffects } from './effects';

describe('Departures Effects', () => {
    let service: DepartureService;
    let effects: DeparturesEffects;
    let actions: Observable<any>;
    const fakeDepartures: DepartureInterface[] = [];
    const initialState: DepartureStateInterface = {
        station: 'GVC',
        departures: [],
        error: null,
        isLoading: false
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DeparturesEffects,
                provideMockActions(() => actions),
                {
                    provide: DepartureService,
                    useValue: {
                        getDepartures: jest.fn().mockImplementationOnce(() => of(fakeDepartures))
                    }
                },
                provideMockStore({initialState})
            ]
        });
        service = TestBed.inject(DepartureService);
        effects = TestBed.inject(DeparturesEffects);
    });

    test('should return an action of type getDeparturesSuccess', () => {
        const action = DeparturesActions.getDepartures({ station: 'GVC' });
        actions = hot('-a', {a: action});
        const completion = DeparturesActions.getDeparturesSuccess({ departures: fakeDepartures });
        const expected = cold('-b', {b: completion});

        expect(effects.getDepartures$).toBeObservable(expected);
    });

    test('should dispatch getDeparturesFailure', () => {
        const errorResponse = new HttpErrorResponse({
            error: { message: '', code: 400 },
            status: 400,
            statusText: 'Bad Request',
        });
        service.getDepartures = jest.fn().mockReturnValue(throwError(errorResponse));

        const action = DeparturesActions.getDepartures({ station: 'GVC' });
        actions = hot('-a', { a: action });
        const completion = DeparturesActions.getDeparturesFailure({ error: { message: '', statusCode: 400 } });
        const expected = cold('-b', { b: completion });

        expect(effects.getDepartures$).toBeObservable(expected);

    });
});
