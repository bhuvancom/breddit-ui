import { Injectable } from '@angular/core';
import { APICall } from '../util/api-call';
import { VoteReq } from '../models/request/vote-req';
import { Observable } from 'rxjs';
import DataState from '../models/data-state';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  vote(voteType: VoteReq, postId: string): Observable<DataState<any>> {
    return this.apiCaller.apiCall("POST", "/vote/" + postId, undefined, voteType);
  }
  constructor(private apiCaller: APICall) { }
}
