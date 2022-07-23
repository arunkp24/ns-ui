import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as DeparturesActions from '../store/actions';

@Component({
    selector: 'app-departures',
    templateUrl: './departures.component.html'
})
export class DeparturesComponent implements OnInit{
    constructor(private store: Store<AppStateInterface>) {}

    ngOnInit(): void {
        this.store.dispatch(DeparturesActions.getDepartures({station: 'GVC'}));
    }
}