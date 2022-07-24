import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { errorSelector, stationsSelector } from '../store/selectors';
import { StationInterface } from '../types/station.interface';
import { StationErrorInterface } from '../types/stationError.interface';
import * as StationsActions from './../store/actions';

@Component({
    selector: 'app-stations',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit, OnDestroy {

    stations: StationInterface[] = [];
    filteredStations$!: Observable<StationInterface[]>;
    stations$: Observable<StationInterface[]>;
    error$: Observable<StationErrorInterface | null>;
    subscription!: Subscription;
    showErrorMessage: Boolean = false;

    formControl = new FormControl<string | StationInterface>('', Validators.required);

    constructor(private store: Store<AppStateInterface>, private router: Router) {
        this.stations$ = this.store.pipe(select(stationsSelector))
        this.error$ = this.store.pipe(select(errorSelector));

        this.subscription = this.stations$.subscribe(stations => {
            this.stations = stations;
        })
    }

    displayStationName(staion: StationInterface): string {
        return staion && staion.name ? staion.name : '';
    }

    ngOnInit(): void {
        this.store.dispatch(StationsActions.getStations());
        this.filteredStations$ = this.formControl.valueChanges.pipe(
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._filter(name as string) : this.stations.slice();
            }),
        );
    }

    private _filter(name: string): StationInterface[] {
        const filterValue = name.toLowerCase();

        return this.stations.filter(station => station.name.toLowerCase().includes(filterValue));
    }

    getDepartures() {
        const selectedStation = typeof this.formControl.value === 'string' ? null : this.formControl.value
        if (!selectedStation) {
            this.formControl.setValue('');
            this.showErrorMessage = true;
            return;
        }
        this.router.navigate(['/departures'], { queryParams: { station: selectedStation.code } });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}