import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DeparturesComponent } from './departures.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DepartureService } from '../services/departures.service';
import { RouteGuard } from '../services/route-guard.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Location } from '@angular/common';

describe('DeparturesComponent', () => {
  let component: DeparturesComponent;
  let fixture: ComponentFixture<DeparturesComponent>;
  let store: MockStore;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        RouterTestingModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
      ],
      declarations: [
        DeparturesComponent
      ],
      providers: [DepartureService, RouteGuard, provideMockStore({})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    location = TestBed.inject(Location);
    location.back = jest.fn();
  })

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test('should dispatch getDepartures action', (done) => {
    const expectedAction = { type: '[Departures] Get Departures' };
    store.scannedActions$.subscribe(scannedAction => {
      expect(scannedAction).toEqual(expectedAction);
      done();
    })
  })

  test('should call location back function', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

});
