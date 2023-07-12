import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  showTab = true;
  showHeader = true;
  private showTabSubject = new BehaviorSubject<boolean>(true);
  public showTab$ = this.showTabSubject.asObservable();

  updateShowTab2(showTab: boolean) {
    this.showTabSubject.next(showTab);
  }
updateShowTab(value: boolean) {
  this.showTab = value;
}

updateShowHeader(value: boolean) {
  this.showHeader = value;
}

reset() {
  this.showTab = true;
  this.showHeader = true;
}
getShowTab(): boolean {
  return this.showTab;
}

setShowTab(value: boolean): void {
  this.showTab = value;
}
}