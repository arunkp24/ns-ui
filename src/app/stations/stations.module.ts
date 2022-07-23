import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StationService } from './services/stations.service';
import { StationsRoutingModule } from './stations-routing.module';
import { StationsEffects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
    imports: [
        CommonModule,
        StationsRoutingModule,
        StoreModule.forFeature('stations', reducers),
        EffectsModule.forFeature([StationsEffects])
    ],
    providers: [StationService],
    declarations: [],
    exports: []
})
export class StationsModule {

}