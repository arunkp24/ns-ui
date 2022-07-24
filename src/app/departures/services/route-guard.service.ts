import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {
        return route.queryParams['station'] ? true : this.router.navigate(['/']);
    }
}