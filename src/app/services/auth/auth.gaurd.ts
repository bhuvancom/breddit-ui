import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const isUserLoggedInGaurd = (
    routeActivated: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const auth = inject(AuthService);
    const route = inject(Router);
    const isAuthentic = auth.isLoggedIn.value;
    const isLoggedIn = isAuthentic;
    if (!isLoggedIn) {
        route.navigate(['/auth/login']);
    }
    return isLoggedIn;
};

export const isUserNotLoggedInGaurd = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log("checking auth gaurd for not login url is ", route.url);
    const auth = inject(AuthService);
    const isAuthentic = auth.isLoggedIn.value;
    return !isAuthentic;
};
