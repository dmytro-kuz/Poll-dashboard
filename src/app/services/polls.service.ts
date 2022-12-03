import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Polls } from '../interfaces/polls';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private apiService: ApiService) {}

  getAllPolls(): Observable<Polls[]> {
    return this.apiService.get('polls');
  }

  getPoll(): Observable<any> {
    return this.apiService.get('poll');
  }
}
