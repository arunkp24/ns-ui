import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DepartureService } from './services/departures.service';
import { DeparturesRoutingModule } from './departures-routing.module';
import { DeparturesEffects } from './store/effects';
import { reducers } from './store/reducers';
import { DeparturesComponent } from './components/departures.component';
import { RouteGuard } from './services/route-guard.service';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        DeparturesRoutingModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        SharedModule,
        StoreModule.forFeature('departures', reducers),
        EffectsModule.forFeature([DeparturesEffects])
    ],
    providers: [DepartureService, RouteGuard],
    declarations: [DeparturesComponent],
    exports: []
})
export class DeparturesModule {

}