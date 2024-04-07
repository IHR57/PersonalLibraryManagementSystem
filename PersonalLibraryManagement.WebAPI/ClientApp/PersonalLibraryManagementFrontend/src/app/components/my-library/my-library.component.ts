import { Component } from '@angular/core';
import { LibraryService } from '../../services/library.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';
import { FormControl } from '@angular/forms';
import { UpdateBookDialogComponent } from './update-book-dialog/update-book-dialog/update-book-dialog.component';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent {
  sortBy: string = "boughtDate";
  sortByFields: any[] = [
    { displayName: 'Name', name: 'name' },
    { displayName: 'Created Date', name: 'createdDate' },
    { displayName: 'Bought Date', name: 'boughtDate' },
    { displayName: 'Finished Date', name: 'finishedDate' },
    { displayName: 'Rating', name: 'personalRating' },
    { displayName: 'Price', name: 'buyingPrice' }
  ];
  categoryList: any[] = [];
  writerList: any[] = [];
  booklist: any = [];

  writers: any = []
  categories: any = []

  startValue: number = 0;
  endValue: number = 2000;

  isAscending: boolean = true;
  searchKey = new FormControl('')

  constructor(
    private libraryService: LibraryService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllBooks();
    this.getAllCateogry();
    this.getAllWriters();
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: "50%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.getAllBooks();
      }
    });
  }

  openUpdateBookDialog(bookInfo: any) {
    const updateBookDialogRef = this.dialog.open(UpdateBookDialogComponent, {
      width: "50%",
      data : bookInfo
    });

    updateBookDialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllBooks();
      }
    })
  }

  getAllBooks() {
    console.log(this.categories);
    let selectedCategories = this.categories.filter((obj: { selected: boolean; name: string}) => obj.selected == true)
                              .map((obj: { selected: boolean; name: string}) => obj.name);

    let selectedWriters = this.writers.filter((writer: {  name: string; selected: boolean }) => writer.selected == true)
                              .map((obj: { selected: boolean; name: string}) => obj.name);;
                              
    this.libraryService.getAllBooks(this.searchKey.value || "", 0, 10, selectedCategories, selectedWriters, this.startValue, this.endValue, this.sortBy, this.isAscending)
    .subscribe({
      next: (response: any) => {
        this.booklist = response.items;
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }

  getAllCateogry() {
    this.libraryService.getAllCategory()
    .subscribe({
      next: (response: any) => {
        this.categoryList = response.result;
        this.categoryList.forEach(item => {
          this.categories.push({ name: item, selected: false });
        });
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }

  getAllWriters() {
    this.libraryService.getAllWriters()
    .subscribe({
      next: (response: any) => {
        this.writerList = response.result;
        this.writerList.forEach(item => {
          this.writers.push({ name: item, selected: false });
        });
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }
}
