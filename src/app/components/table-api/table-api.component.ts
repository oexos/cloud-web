import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { catchError, merge, of, startWith, switchMap, tap } from 'rxjs';
import { emptyGithubApi } from '../../constants/GithubApi';
import { GithubService } from '../../service/github/github.service';
import { GlobalLoaderServiceService } from '../../service/loader/global-loader-service.service';

@Component({
  selector: 'app-table-api',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, DatePipe],
  templateUrl: './table-api.component.html',
  styleUrl: './table-api.component.css',
})
export class TableApiComponent implements AfterViewInit {
  @ViewChild(MatTable<GithubIssue>) table!: MatTable<GithubIssue>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'createdAt', 'state', 'number', 'title'];
  displayedColumnsFilter: string[] = [
    'no-filter',
    'no-filter',
    'no-filter',
    'no-filter',
    'no-filter',
  ];

  footerColums: string[] = ['id'];

  constructor(
    private githubService: GithubService,
    private globalLoaderServiceService: GlobalLoaderServiceService
  ) {}

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith(emptyGithubApi),
        tap({
          next: () => {
            Promise.resolve()
              .then(() => {
                this.globalLoaderServiceService.setShowProgressBar = true;
              })
              .catch((err) =>
                console.log('Loading is not showing because: ' + err)
              );
          },
        }),
        switchMap(() => {
          return this.githubService
            .getRepoIssues(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize
            )
            .pipe(catchError((err) => of(emptyGithubApi)));
        }),
        tap({
          next: () => {
            Promise.resolve()
              .then(() => {
                this.globalLoaderServiceService.setShowProgressBar = false;
              })
              .catch((err) =>
                console.log('Loading is not hiding because: ' + err)
              );
          },
        })
      )
      .subscribe({
        next: (data) => {
          this.paginator.length = data.totalCount;
          this.table.dataSource = data.items;
        },
      });
  }
}

export interface GithubApi {
  items: GithubIssue[];
  totalCount: number;
}

export interface GithubIssue {
  id: number;
  createdAt: string;
  number: string;
  state: string;
  title: string;
}
