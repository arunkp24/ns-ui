import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { StationService } from "./stations.service";

describe('StationService', () => {
    let service: StationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [StationService]
        });
        service = TestBed.inject(StationService);
    })

    it('should exist', () => {
        expect(service).toBeDefined();
    })
});