import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import ApiPagedResponse from '../models/api-paged-response';
import Subreddit from '../models/subreddits';
import DataState from '../models/data-state';
import SubredditRequest from '../models/request/subreddit-req';
import { APICall } from '../util/api-call';

@Injectable({
  providedIn: 'root',
})
export class SubredditService {
  public subReddits = new BehaviorSubject<
    DataState<ApiPagedResponse<Subreddit>>
  >(
    new DataState({
      data: {
        content: [],
        first: false,
        last: true,
        totalPages: 0,
      },
    })
  );
  private currentSubredditListPageNo = 1;
  public fetchSubreddits() {
    this.apiCaller
      .apiCall<ApiPagedResponse<Subreddit>>(
        'GET',
        '/subreddit',
        { page: this.currentSubredditListPageNo, pageSize: 10 },
        undefined
      )
      .subscribe((d) => {
        const oldData = this.subReddits.getValue().data?.content ?? [];
        const newData = d.data?.content ?? [];
        const veryNewData: Subreddit[] = [...oldData, ...newData];
        const updatedState: ApiPagedResponse<Subreddit> = {
          content: veryNewData,
          first: d.data?.first ?? false,
          last: d.data?.last ?? false,
          totalPages: d.data?.totalPages ?? 0,
        };
        const updatedDataState = new DataState({
          data: updatedState,
          error: d.error,
          isLoading: d.isLoading,
        });
        this.subReddits.next(updatedDataState);
      });
  }

  public createSubreddit(
    subredditRequest: SubredditRequest
  ): Observable<DataState<Subreddit | undefined>> {
    return this.apiCaller.apiCall<Subreddit>(
      'POST',
      '/subreddi',
      undefined,
      subredditRequest
    );
  }

  public deleteSubreddit(id: number): Observable<any> {
    // return this.http.delete(`${environment.baseUrl}/subreddit/${id}`);
    return this.apiCaller.apiCall<any>(
      'DELETE',
      '/subreddit/' + id,
      undefined,
      undefined
    );
  }

  constructor(private apiCaller: APICall) {}
}
