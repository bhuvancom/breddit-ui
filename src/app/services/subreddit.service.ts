import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import ApiPagedResponse from '../models/api-paged-response';
import Subreddit from '../models/subreddits';
import DataState from '../models/data-state';
import SubredditRequest from '../models/request/subreddit-req';
import { APICall } from '../util/api-call';
import { dataTransformer } from '../util/data-transformer';

@Injectable({
  providedIn: 'root',
})
export class SubredditService {
  findSubredditsByUser(
    username: string,
    subredditPageNo: number
  ): Observable<DataState<ApiPagedResponse<Subreddit>>> {
    return this.apiCaller.apiCall('GET', '/subreddit/by-username/' + username, {
      page: subredditPageNo,
    });
  }
  fetSubRedDetailsOfId(id: string): Observable<DataState<Subreddit>> {
    return this.apiCaller.apiCall<Subreddit>('GET', '/subreddit/' + id);
  }
  public subReddits = new BehaviorSubject<
    DataState<ApiPagedResponse<Subreddit>>
  >(new DataState());
  private currentSubredditListPageNo = 1;
  public fetchSubreddits() {
    const cuu = this.subReddits.value.data?.last;
    if (cuu) return; // Page is last, no API call needed
    this.apiCaller
      .apiCall<ApiPagedResponse<Subreddit>>(
        'GET',
        '/subreddit',
        { page: this.currentSubredditListPageNo, pageSize: 1 },
        undefined
      )
      .subscribe((d) => {
        this.subReddits.next(
          dataTransformer(d, this.subReddits.value, () => {
            this.currentSubredditListPageNo++;
          })
        );
      });
  }

  public createSubreddit(
    subredditRequest: SubredditRequest,
    idEdit: boolean,
    subRedditId: number
  ): Observable<DataState<Subreddit | undefined>> {
    if (idEdit) {
      return this.apiCaller.apiCall<Subreddit>(
        'PUT',
        '/subreddit/' + subRedditId,
        undefined,
        subredditRequest
      );
    }
    return this.apiCaller.apiCall<Subreddit>(
      'POST',
      '/subreddit',
      undefined,
      subredditRequest
    );
  }

  public deleteSubreddit(id: string): Observable<DataState<any>> {
    // return this.http.delete(`${environment.baseUrl}/subreddit/${id}`);
    return this.apiCaller.apiCall<any>('DELETE', '/subreddit/' + id);
  }

  constructor(private apiCaller: APICall) { }
}
