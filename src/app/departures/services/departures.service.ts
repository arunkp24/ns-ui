import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DepartureInterface } from '../types/departure.interface';
import { environment } from '../../../environments/environment';

enum TrainTypes {
    SPR = 'Sprinter',
    IC = 'Intercity'
}
@Injectable()
export class DepartureService {
    constructor(private http: HttpClient) {}

    getDepartures(station: string): Observable<DepartureInterface[]>{
        return this.http.get<any>(`${environment.apiUrls.DEPARTURES}?station=${station}`, { headers: { skip: "true" } }).pipe(
            map(response => response.payload.departures.map((data: any): DepartureInterface => ({
                time: data.plannedDateTime,
                direction: data.direction,
                track: data.plannedTrack,
                category: data.trainCategory === 'SPR' ? TrainTypes.SPR : TrainTypes.IC
            })))
        );
    }

}