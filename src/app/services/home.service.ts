import { Injectable } from '@angular/core';
import { APICall } from '../util/api-call';
import DataState from '../models/data-state';
import { BehaviorSubject } from 'rxjs';
import ApiPagedResponse from '../models/api-paged-response';
import Post from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public homePagePosts = new BehaviorSubject<DataState<ApiPagedResponse<Post>>>(
    new DataState({
      data: {
        content: [],
        first: false,
        last: true,
        totalPages: 0,
      },
    })
  );
  private currentHomePageNo = 1;
  public fetchHomePageData() {
    this.apiCall
      .apiCall<ApiPagedResponse<Post>>(
        'GET',
        '/home',
        { page: this.currentHomePageNo, pageSize: 1 },
        undefined
      )
      .subscribe((d) => {
        if (d.data && d.data.last === false) {
          this.currentHomePageNo++;
        }
        const oldData = this.homePagePosts.getValue().data?.content ?? [];
        const newData = d.data?.content ?? [];
        const veryNewData: Post[] = [...oldData, ...newData];
        const updatedState: ApiPagedResponse<Post> = {
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
        this.homePagePosts.next(updatedDataState);
      });
  }
  constructor(private apiCall: APICall) {}
}
