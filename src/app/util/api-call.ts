import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
} from '@angular/common/http';
import DataState from '../models/data-state';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class APICall {
  constructor(private http: HttpClient) {}
  public apiCall<T>(
    apiType: API_CALL_TYPE,
    path: string,
    queryString?: QueryStrig,
    body?: any
  ): Observable<DataState<T>> {
    // const headerKey = this.authSer.getToken();
    const baseUrl = environment.baseUrl;
    return new Observable((observer) => {
      const dataState = new DataState<T>({
        data: null,
        error: '',
        isLoading: false,
      });
      dataState.isLoading = true;

      observer.next(dataState);
      try {
        const response = this.http.request<T>(apiType, baseUrl + path, {
          body,
          params: queryString,
          observe: 'body',
          // headers: {
          //   Authorization: `Bearer ${headerKey}`,
          // },
        });
        // observer.next(new DataState(r, {isLoading:false, error:""}));

        response.subscribe({
          next: (value) => {
            dataState.data = value;
            dataState.isLoading = false;
            dataState.error = '';
            observer.next(dataState);
          },
          error: (err: HttpErrorResponse) => {
            // console.log(JSON.stringify(err));
            dataState.isLoading = false;
            dataState.error = err?.error?.message ?? err.message;
            observer.next(dataState);
          },
        });
      } catch (e: any) {
        console.log('inside catch ', JSON.stringify(e));

        dataState.isLoading = false;
        dataState.error = e?.message ?? '';
        observer.next(dataState);
      } finally {
        console.log('Finally called ');
      }
    });
  }
}

type API_CALL_TYPE = 'DELETE' | 'PUT' | 'POST' | 'GET';

type QueryStrig = {
  [key: string]: any;
};
