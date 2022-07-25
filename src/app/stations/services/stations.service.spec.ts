import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StationService } from "./stations.service";
import { HttpErrorResponse } from "@angular/common/http";

describe('StationService', () => {
    let service: StationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [StationService]
        });
        service = TestBed.inject(StationService);
        httpMock = TestBed.inject(HttpTestingController);
    })

    test('should exist', () => {
        expect(service).toBeDefined();
    });

    test('should return stations from ns api', (done) => {
        service.getStations().subscribe(stations => {
            expect(stations.length).toBe(1);
            done();
        });

        const payload = {
            "payload": [
                {
                    "UICCode": "8002084",
                    "stationType": "SNELTREIN_STATION",
                    "EVACode": "8000139",
                    "code": "MGZB",
                    "sporen": [],
                    "synoniemen": [
                        "Gunzburg"
                    ],
                    "heeftFaciliteiten": true,
                    "heeftVertrektijden": true,
                    "heeftReisassistentie": false,
                    "namen": {
                        "lang": "Günzburg",
                        "middel": "Günzburg",
                        "kort": "Günzburg"
                    },
                    "land": "D",
                    "lat": 48.460226,
                    "lng": 10.278707,
                    "radius": 0,
                    "naderenRadius": 0,
                    "ingangsDatum": "2018-12-16",
                    "nearbyMeLocationId": {
                        "value": "MGZB",
                        "type": "stationV2"
                    }
                }]
        }
        const req = httpMock.expectOne('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations');
        req.flush(payload);
        httpMock.verify();
    });

    test('should return error from ns api', (done) => {
        service.getStations().subscribe({
            next(stations) { fail('should have failed with 404 error') },
            error(error: HttpErrorResponse) {
                expect(error.status).toBe(404);
                expect(error.error).toContain('404 error');
                done();
            }
        });

        const req = httpMock.expectOne('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations');
        req.flush('404 error', { status: 404, statusText: 'Not found' });
        httpMock.verify();
    });

});