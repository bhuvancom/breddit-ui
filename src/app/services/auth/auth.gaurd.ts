import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const isUserLoggedInGaurd = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log("checking auth gaurd for login");

    const auth = inject(AuthService);
    const isAuthentic = auth.getUser() && auth.getToken();
    return isAuthentic !== undefined && isAuthentic !== null;
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
