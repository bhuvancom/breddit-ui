import { Injectable } from '@angular/core';
import { APICall } from '../util/api-call';
import { Observable } from 'rxjs';
import ApiPagedResponse from '../models/api-paged-response';
import DataState from '../models/data-state';
import { Comment } from '../models/comment';
import { CommetnReq } from '../models/request/comment-req';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  postComment(postId: string, comment: CommetnReq) {
    return this.apiCaller.apiCall("POST", "/comment/" + postId, undefined, comment);
  }
  deleteComment(comId: string): Observable<DataState<any>> {
    return this.apiCaller.apiCall("DELETE", "/comment/" + comId)
  }
  fetchComment(
    postId: string,
    pageNo: number
  ): Observable<DataState<ApiPagedResponse<Comment>>> {
    return this.apiCaller.apiCall('GET', '/comment/' + postId, {
      page: pageNo,
    });
  }
  constructor(private apiCaller: APICall) { }
}
