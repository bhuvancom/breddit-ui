import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const isUserLoggedInGaurd = (
    routeActivated: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const auth = inject(AuthService);
    const route = inject(Router);
    const isAuthentic = auth.getUser() && auth.getToken();
    const isLoggedIn = !(isAuthentic !== undefined && isAuthentic !== null);
    if (!isLoggedIn) {
        route.navigate(['/auth/login']);
    }

    return isLoggedIn;
};

export const isUserNotLoggedInGaurd = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log("checking auth gaurd for not login");

    const auth = inject(AuthService);
    const isAuthentic = auth.getUser() && auth.getToken();
    return !isAuthentic;
};
