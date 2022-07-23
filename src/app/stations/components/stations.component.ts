import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as StationsActions from './../store/actions';

@Component({
    selector: 'app-stations',
    templateUrl: './stations.component.html'
})
export class StationsComponent implements OnInit{
    constructor(private store: Store<AppStateInterface>, private router: Router) {}

    ngOnInit(): void {
        this.store.dispatch(StationsActions.getStations());
    }

    goToDepartures() {
        this.router.navigate(['/departures']);
    }
}