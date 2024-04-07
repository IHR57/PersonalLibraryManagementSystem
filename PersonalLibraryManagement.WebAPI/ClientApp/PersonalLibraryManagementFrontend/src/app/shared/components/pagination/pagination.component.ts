import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConstants } from '../../app.constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageIndex = 0;
  @Input() totalItems = 0;
  @Input() maxPageIndex = 0;

  @Output() pageChangedEvent = new EventEmitter<number>();

  onClickNext() {
    this.pageIndex += 1;
    this.pageChangedEvent.emit(this.pageIndex);
  }

  onClickPrevious() {
    this.pageIndex -= 1;
    this.pageChangedEvent.emit(this.pageIndex);
  }
}
