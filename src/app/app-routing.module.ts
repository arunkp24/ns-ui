import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./stations/stations.module').then(m => m.StationsModule) 
  },
  {
    path: 'departures',
    loadChildren: () => import('./departures/departures.module').then(m => m.DeparturesModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
