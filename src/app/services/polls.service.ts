import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Polls } from '../interfaces/polls';
import { HttpParams } from '@angular/common/http';
import { Poll } from '../interfaces/poll';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  selectedPollId?: any;

  constructor(private apiService: ApiService) {}

  getAllPolls(): Observable<Polls[]> {
    return this.apiService.get('polls');
  }

  getPoll(pollId: any): Observable<Poll> {
    return this.apiService.get('poll/', this.setHttpParams(pollId));
  }

  setHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null) {
        httpParams = httpParams.append(key, value);
      }
    });
    return httpParams;
  }
}
