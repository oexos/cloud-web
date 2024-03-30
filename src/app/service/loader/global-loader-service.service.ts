import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderServiceService {
  private showProgressBar: boolean = false;
  get getShowProgressBar() {
    return this.showProgressBar;
  }
  set setShowProgressBar(showProgressBar: boolean) {
    this.showProgressBar = showProgressBar;
  }
  constructor() {}
}
