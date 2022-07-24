import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StationService } from './services/stations.service';
import { StationsRoutingModule } from './stations-routing.module';
import { StationsEffects } from './store/effects';
import { reducers } from './store/reducers';
import { StationsComponent } from './components/stations.component';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        StationsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        StoreModule.forFeature('stations', reducers),
        EffectsModule.forFeature([StationsEffects])
    ],
    providers: [StationService],
    declarations: [StationsComponent],
    exports: []
})
export class StationsModule {

}