import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent {
  sortBy: string = "Bought Date";
  sortByFields: string[] = ['Name', 'Writer', 'Bought Date', 'Finished Date'];
  categoryList: any[] = [];
  writerList: any[] = [];
  booklist: any = [];

  writers: any = []
  categories: any = []

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
    console.log(this.categories);
    let selectedCategories = this.categories.filter((obj: { selected: boolean; name: string}) => obj.selected == true)
                              .map((obj: { selected: boolean; name: string}) => obj.name);

    let selectedWriters = this.writers.filter((writer: {  name: string; selected: boolean }) => writer.selected == true)
                              .map((obj: { selected: boolean; name: string}) => obj.name);;

    console.log(selectedCategories);

    this.libraryService.getAllBooks(0, 10, selectedCategories, selectedWriters)
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
