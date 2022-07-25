import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StationsComponent } from './stations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StationService } from '../services/stations.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';

describe('StationsComponent', () => {
  let component: StationsComponent;
  let fixture: ComponentFixture<StationsComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
      ],
      providers: [StationService, provideMockStore({})],
      declarations: [
        StationsComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
    router = TestBed.inject(Router);
    router.navigate = jest.fn();
  })

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test('should dispatch getStations action', (done) => {
    const expectedAction = { type: '[Stations] Get Stations' };
    store.scannedActions$.subscribe(scannedAction => {
      expect(scannedAction).toEqual(expectedAction);
      done();
    })
  });

  test('should set error message', () => {
    component.formControl.setValue('abc');
    component.gotToDepartures();
    expect(component.formControl.value).toBe('');
    expect(component.showErrorMessage).toBe(true);
  });

  test('should naigate to departures page', () => {
    component.formControl.setValue({code: 'GVC', name: 'Den Haag'});
    component.gotToDepartures();
    expect(router.navigate).toHaveBeenCalledWith(['/departures'], { queryParams: { station: 'GVC' } });
  });

});
