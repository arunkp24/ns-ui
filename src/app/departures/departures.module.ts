import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DepartureService } from './services/departures.service';
import { DeparturesRoutingModule } from './departures-routing.module';
import { DeparturesEffects } from './store/effects';
import { reducers } from './store/reducers';
import { DeparturesComponent } from './components/departures.component';

@NgModule({
    imports: [
        CommonModule,
        DeparturesRoutingModule,
        StoreModule.forFeature('departures', reducers),
        EffectsModule.forFeature([DeparturesEffects])
    ],
    providers: [DepartureService],
    declarations: [DeparturesComponent],
    exports: []
})
export class DeparturesModule {

}