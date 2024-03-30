import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { GithubApi } from '../../components/table-api/table-api.component';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getRepoIssues(
    sortBy: string,
    sortDirection: SortDirection,
    pageIndex: number,
    pageSize: number
  ): Observable<GithubApi> {
    const href = 'http://192.168.232.34:8080/github-issue';
    const requestUrl = `${href}?sortBy=${sortBy}&pageNumber=${pageIndex}&pageSize=${pageSize}&sortDirection=${sortDirection}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}
