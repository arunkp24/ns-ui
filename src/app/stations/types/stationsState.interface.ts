import { StationInterface } from './station.interface';
import { StationErrorInterface } from './stationError.interface';

export interface StationsStateInterface {
    isLoading: boolean;
    stations: StationInterface[];
    error: StationErrorInterface | null;
}