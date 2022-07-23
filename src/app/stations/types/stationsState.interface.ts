import { StationInterface } from './station.interface';
import { StationErrorInterface } from './stationError.interface';

export interface StatiosStateInterface {
    isLoading: boolean;
    stations: StationInterface[];
    error: StationErrorInterface | null;
}