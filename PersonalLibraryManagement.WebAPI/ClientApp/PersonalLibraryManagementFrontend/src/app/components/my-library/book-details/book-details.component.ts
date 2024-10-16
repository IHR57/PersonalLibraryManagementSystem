import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { ReadStatus } from 'src/app/models/ReadStatus';
import { LibraryService } from 'src/app/services/library.service';
import { UpdateBookDialogComponent } from '../update-book-dialog/update-book-dialog/update-book-dialog.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  bookId$ = new BehaviorSubject<string>('');
  book!: Book;
  loading$ = new BehaviorSubject<boolean>(false);

  starRange: number[] = [];
  readStatusMap: { [key: number]: string } = {
    [ReadStatus.WishList]: 'WishList',
    [ReadStatus.Pending]: 'Pending',
    [ReadStatus.InProgress]: 'Inprogress',
    [ReadStatus.Completed]: 'Completed',
  };

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.bookId$.next(this.route.snapshot.paramMap.get('id') || '');
    this.getBookDetailsById();
    this.starRange = Array.from({ length: 5 }, (_, index) => index + 1); // Generate range for stars
  }

  openUpdateBookDialog() {
    const updateBookDialogRef = this.dialog.open(UpdateBookDialogComponent, {
      width: '50%',
      data: this.book,
    });

    updateBookDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBookDetailsById();
      }
    });
  }

  getBookDetailsById() {
    this.loading$.next(true);
    this.libraryService.getBookDetailsById(this.bookId$.value).subscribe({
      next: (response: any) => {
        this.book = response;
      },
      complete: () => {
        this.loading$.next(false);
      },
    });
  }
}
