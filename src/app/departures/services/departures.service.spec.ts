import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DepartureService } from "./departures.service";
import { HttpErrorResponse } from "@angular/common/http";

describe('DepartureService', () => {
    let service: DepartureService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DepartureService]
        });
        service = TestBed.inject(DepartureService);
        httpMock = TestBed.inject(HttpTestingController);
    })

    test('should exist', () => {
        expect(service).toBeDefined();
    });

    test('should return departures from ns api', (done) => {
        service.getDepartures('GVC').subscribe(stations => {
            expect(stations.length).toBe(1);
            done();
        });

        const payload = {
            "payload": {
                "source": "PPV",
                "departures": [
                    {
                        "direction": "Enschede",
                        "name": "NS 11659",
                        "plannedDateTime": "2022-07-25T15:33:00+0200",
                        "plannedTimeZoneOffset": 120,
                        "actualDateTime": "2022-07-25T15:42:00+0200",
                        "actualTimeZoneOffset": 120,
                        "plannedTrack": "9",
                        "product": {
                            "number": "11659",
                            "categoryCode": "IC",
                            "shortCategoryName": "NS Intercity",
                            "longCategoryName": "Intercity",
                            "operatorCode": "NS",
                            "operatorName": "NS",
                            "type": "TRAIN"
                        },
                        "trainCategory": "IC",
                        "cancelled": false,
                        "routeStations": [
                            {
                                "uicCode": "8400390",
                                "mediumName": "Leiden C."
                            },
                            {
                                "uicCode": "8400561",
                                "mediumName": "Schiphol Airport"
                            },
                            {
                                "uicCode": "8400061",
                                "mediumName": "Amsterdam Zuid"
                            },
                            {
                                "uicCode": "8400322",
                                "mediumName": "Hilversum"
                            }
                        ],
                        "messages": [],
                        "departureStatus": "ON_STATION"
                    }]
            },
            "links": {
                "disruptions": {
                    "uri": "/api/v2/disruptions?station=GVC"
                }
            },
            "meta": {
                "numberOfDisruptions": 4
            }
        };
        const req = httpMock.expectOne('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?station=GVC');
        req.flush(payload);
        httpMock.verify();
    });

    test('should return error from ns api', (done) => {
        service.getDepartures('GVC').subscribe({
            next(departures) { fail('should have failed with 404 error') },
            error(error: HttpErrorResponse) {
                expect(error.status).toBe(404);
                expect(error.error).toContain('404 error');
                done();
            }
        });

        const req = httpMock.expectOne('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?station=GVC');
        req.flush('404 error', { status: 404, statusText: 'Not found' });
        httpMock.verify();
    });

});