import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent {
  sortBy: string = "Bought Date";
  sortByFields: string[] = ['Name', 'Writer', 'Bought Date', 'Finished Date'];
  categories: string[] = [];
  writers: string[] = [];
  booklist: any = [];

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

  getAllBooks() {
    this.libraryService.getAllBooks(0, 10)
    .subscribe({
      next: (response: any) => {
        this.booklist = response.items;
        console.log(this.booklist);
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }

  getAllCateogry() {
    this.libraryService.getAllCategory()
    .subscribe({
      next: (response: any) => {
        this.categories = response.result;
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }

  getAllWriters() {
    this.libraryService.getAllWriters()
    .subscribe({
      next: (response: any) => {
        this.writers = response.result;
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }
}
