import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { RouteGuard } from "./route-guard.service";

describe('RouteGuard', () => {
    let router: Router
    let routeGuard: RouteGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [RouteGuard]
        });
        router = TestBed.inject(Router);
        router.navigate = jest.fn();
        routeGuard = TestBed.inject(RouteGuard);
    });


    test('should exist', () => {
        expect(routeGuard).toBeDefined();
    });

    test('should return true', () => {
        const param: any = {
            queryParams: {
                station: 'GVC'
            },        
        };
        const result = routeGuard.canActivate(param);
        expect(result).toBe(true);
    });

    test('should return false', () => {
        const param: any = {
            queryParams: {},        
        };
        const result = routeGuard.canActivate(param);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
});