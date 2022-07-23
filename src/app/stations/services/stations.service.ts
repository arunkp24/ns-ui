import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { StationInterface } from '../types/station.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class StationService {
    constructor(private http: HttpClient) {}

    getStations(): Observable<StationInterface[]>{
        return this.http.get<any>(environment.apiUrls.STATIONS).pipe(
            map(response => response.payload.map((data: any): StationInterface => ({
                code: data.code,
                name: data.namen.lang
            })))
        );
    }

}