import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeparturesComponent } from './components/departures.component';
import { RouteGuard } from './services/route-guard.service';

const routes: Routes = [
    { 
        path: '', 
        component: DeparturesComponent,
        canActivate: [RouteGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeparturesRoutingModule {}