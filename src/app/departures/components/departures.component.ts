import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as DeparturesActions from '../store/actions';
import { departuresSelector, errorSelector, isLoadingSelector } from '../store/selectors';
import { DepartureInterface } from '../types/departure.interface';
import { DepartureErrorInterface } from '../types/departureError.interface';

@Component({
    selector: 'app-departures',
    templateUrl: './departures.component.html',
    styleUrls: ['./departures.component.scss']
})
export class DeparturesComponent implements OnInit, OnDestroy, AfterViewInit{

    error$: Observable<DepartureErrorInterface | null>;
    departures$: Observable<DepartureInterface[]>;
    isLoading$: Observable<Boolean>;

    subscriptions: Subscription = new Subscription();
    departures: DepartureInterface[] = [];
    station: string = '';
    displayedColumns: string[] = ['time', 'direction', 'track', 'type'];

    dataSource = new MatTableDataSource<DepartureInterface>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private store: Store<AppStateInterface>, private route: ActivatedRoute, private location: Location) {
        this.departures$ = this.store.pipe(select(departuresSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));

        this.subscriptions.add(route.queryParams.subscribe(params => this.station = params['station']));
        this.subscriptions.add(this.departures$.subscribe(departures => {
            this.dataSource.data = this.departures = departures;
        }));
    }

    ngOnInit(): void {
        this.store.dispatch(DeparturesActions.getDepartures({station: this.station}));
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
      }

    goBack(): void {
        this.location.back();
    }

    filterDepartures(trainType: string | undefined): void {
        this.dataSource.data = trainType ? this.departures.filter(departure => departure.category.toLowerCase() === trainType?.toLowerCase()) : this.departures;
    }

    searchDepartures(searchTerm: string) {
        this.dataSource.filter = searchTerm;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}