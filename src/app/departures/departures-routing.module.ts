import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeparturesComponent } from './components/departures.component';

const routes: Routes = [
    { path: '', component: DeparturesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeparturesRoutingModule {}