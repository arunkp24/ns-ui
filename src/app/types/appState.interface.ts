import { DepartureStateInterface } from '../departures/types/departuresState.interface';
import { StationsStateInterface } from '../stations/types/stationsState.interface';

export interface AppStateInterface {
    stations: StationsStateInterface,
    departures: DepartureStateInterface
}