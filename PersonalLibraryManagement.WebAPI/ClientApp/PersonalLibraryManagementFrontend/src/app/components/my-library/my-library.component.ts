import { Component } from '@angular/core';
import { LibraryService } from '../../services/library.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';
import { FormControl } from '@angular/forms';
import { UpdateBookDialogComponent } from './update-book-dialog/update-book-dialog/update-book-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { AppConstants } from 'src/app/shared/app.constants';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent {
  isLoading$ = new BehaviorSubject<boolean>(false);

  sortBy = 'boughtDate';
  totalItems = 0;
  currentPageIndex = 0;
  maxPageIndex = 0;

  sortByFields: any[] = [
    { displayName: 'Name', name: 'name' },
    { displayName: 'Created Date', name: 'createdDate' },
    { displayName: 'Bought Date', name: 'boughtDate' },
    { displayName: 'Finished Date', name: 'finishedDate' },
    { displayName: 'Rating', name: 'personalRating' },
    { displayName: 'Price', name: 'buyingPrice' },
  ];
  categoryList: any[] = [];
  writerList: any[] = [];
  booklist: any = [];

  writers: any = [];
  categories: any = [];

  startValue = 0;
  endValue = 2000;

  isAscending = true;
  searchKey = new FormControl('');

  constructor(
    private libraryService: LibraryService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllBooks(0);
    this.getAllCateogry();
    this.getAllWriters();
  }

  onPageChange($event: any) {
    this.currentPageIndex = $event;
    this.getAllBooks($event);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '720px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.getAllBooks(0);
      }
    });
  }

  openUpdateBookDialog(bookInfo: any) {
    const updateBookDialogRef = this.dialog.open(UpdateBookDialogComponent, {
      width: '720px',
      data: bookInfo,
    });

    updateBookDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllBooks(0);
      }
    });
  }

  getAllBooks(pageIndex = 0) {
    this.currentPageIndex = pageIndex;
    this.isLoading$.next(true);

    const selectedCategories = this.getSelectedCategories();
    const selectedWriters = this.getSelectedWriters();

    this.libraryService
      .getAllBooks(
        this.searchKey.value || '',
        pageIndex,
        AppConstants.LIST_ITEMS_PER_PAGE,
        selectedCategories,
        selectedWriters,
        this.startValue,
        this.endValue,
        this.sortBy,
        this.isAscending
      )
      .subscribe({
        next: (response: any) => {
          this.booklist = response.items;
          this.totalItems = response.total;
          this.setMaxPageNumber();
          this.isLoading$.next(false);
        },
      });
  }

  private getSelectedCategories(): string[] {
    return this.categories
      .filter(
        (obj: { selected: boolean; name: string }) => obj.selected == true
      )
      .map((obj: { selected: boolean; name: string }) => obj.name);
  }

  private getSelectedWriters(): string[] {
    return this.writers
      .filter(
        (writer: { name: string; selected: boolean }) => writer.selected == true
      )
      .map((obj: { selected: boolean; name: string }) => obj.name);
  }

  setMaxPageNumber() {
    let maxPage: number = Math.floor(
      this.totalItems / AppConstants.LIST_ITEMS_PER_PAGE
    );
    if (this.totalItems % AppConstants.LIST_ITEMS_PER_PAGE == 0) {
      maxPage -= 1;
    }

    this.maxPageIndex = maxPage;
  }

  getAllCateogry() {
    this.libraryService.getAllCategory().subscribe({
      next: (response: any) => {
        this.categoryList = response.result;
        this.categoryList.forEach(item => {
          this.categories.push({ name: item, selected: false });
        });
      },
    });
  }

  getAllWriters() {
    this.libraryService.getAllWriters().subscribe({
      next: (response: any) => {
        this.writerList = response.result;
        this.writerList.forEach(item => {
          this.writers.push({ name: item, selected: false });
        });
      },
    });
  }

  onClickDelete(book: Book) {
    this.openConfirmationDialog().subscribe(result => {
      if (result == true) {
        this.deleteBook(book.id);
      }
    });
  }

  deleteBook(id: string) {
    this.libraryService.deleteBook(id).subscribe({
      next: (response: any) => {
        this.getAllBooks();
      },
    });
  }

  private openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
    });

    return dialogRef.afterClosed();
  }

  viewBookDetails(bookId: string) {
    this.router.navigate([`/my-library/book/${bookId}`]);
  }
}
