import { Injectable } from '@angular/core';
import { APICall } from '../util/api-call';
import { Observable } from 'rxjs';
import DataState from '../models/data-state';
import ApiPagedResponse from '../models/api-paged-response';
import Post from '../models/post';
import PostReq from '../models/request/post-req';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  createPost(
    subredditId: string,
    postReq: PostReq,
    editMode: boolean
  ): Observable<DataState<Post>> {
    if (editMode) {
      return this.apiCaller.apiCall('PUT', '/post/' + subredditId, undefined, postReq);
    }
    return this.apiCaller.apiCall(
      'POST',
      '/post/' + subredditId,
      undefined,
      postReq
    );
  }
  fetchPostByPostAndSubRedditId(
    postId: string,
    subredditId: string
  ): Observable<DataState<Post>> {
    return this.apiCaller.apiCall('GET', '/post/' + postId);
  }
  fetchPostByUserName(
    username: string,
    postPageNo: number
  ): Observable<DataState<ApiPagedResponse<Post>>> {
    return this.apiCaller.apiCall('GET', `/post/by-user/` + username, {
      page: postPageNo,
      pageSize: 1,
    });
  }
  fetchPostOfSubRed(
    subredditId: string,
    pageNo: number
  ): Observable<DataState<ApiPagedResponse<Post>>> {
    return this.apiCaller.apiCall('GET', `/post/${subredditId}/posts`, {
      page: pageNo,
      pageSize: 1,
    });
  }

  deletePost(subRedditId: string, postId: string): Observable<DataState<any>> {
    return this.apiCaller.apiCall(
      'DELETE',
      '/post/' + subRedditId + '/posts/' + postId
    );
  }

  constructor(private apiCaller: APICall) { }
}
