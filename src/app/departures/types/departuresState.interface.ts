import { DepartureInterface } from './departure.interface';
import { DepartureErrorInterface } from './departureError.interface';

export interface DepartureStateInterface {
    isLoading: boolean;
    station: string | null;
    departures: DepartureInterface[];
    error: DepartureErrorInterface | null;
}