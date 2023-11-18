import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { Book } from '../models/Book';
import { ReadStatus } from '../models/ReadStatus';
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
  categories: any = [
    {name: 'Fiction', completed: false},
    {name: 'History', completed: false},
    {name: 'Novel', completed: false},
    {name: 'Novel', completed: false},
    {name: 'Novel', completed: false},
    {name: 'Novel', completed: false},
    {name: 'Novel', completed: false},
  ];

  writers: any = [
    {name: 'George Orwell', completed: false},
    {name: 'Harper Lee', completed: false},
    {name: 'Syed Mujtaba Ali', completed: false},
    {name: 'Zamal Nazrul Islam', completed: false},
    {name: 'Ibn Khathir', completed: false},
    {name: 'Yasir Qadhi', completed: false},
    {name: 'Khandhakar Abdullah Jahangir (RA)', completed: false},
  ];

  booklist: Book[] = [
    {
      name: "1984",
      writer: "George Orwell",
      category: "Fiction",
      boughtDate: "21-10-2023",
      finishedDate: "25-10-2023",
      isFavourite: true,
      buyingPrice: 120,
      status: ReadStatus.InProgress,
      personalNotes: "",
      personalRating: 8,
      thumbnail: "",
      userId: ""
    },
    {
      name: "Homage To Catalonia",
      writer: "George Orwell",
      category: "Fiction",
      boughtDate: "21-10-2023",
      finishedDate: "25-10-2023",
      isFavourite: true,
      buyingPrice: 120,
      status: ReadStatus.InProgress,
      personalNotes: "",
      personalRating: 8,
      thumbnail: "",
      userId: ""
    },
    {
      name: "To Kill a MockingBird",
      writer: "Harper Lee",
      category: "Fiction",
      boughtDate: "21-10-2023",
      finishedDate: "25-10-2023",
      isFavourite: true,
      buyingPrice: 120,
      status: ReadStatus.InProgress,
      personalNotes: "",
      personalRating: 8,
      thumbnail: "",
      userId: ""
    },
    {
      name: "The Old Man and Sea",
      writer: "George Orwell",
      category: "Fiction",
      boughtDate: "21-10-2023",
      finishedDate: "25-10-2023",
      isFavourite: true,
      buyingPrice: 120,
      status: ReadStatus.InProgress,
      personalNotes: "",
      personalRating: 8,
      thumbnail: "",
      userId: ""
    },
    {
      name: "7 Habits of Highly Effective People",
      writer: "George Orwell",
      category: "Motivation",
      boughtDate: "21-10-2023",
      finishedDate: "25-10-2023",
      isFavourite: true,
      buyingPrice: 120,
      status: ReadStatus.InProgress,
      personalNotes: "",
      personalRating: 8,
      thumbnail: "",
      userId: ""
    }
  ];

  constructor(
    private libraryService: LibraryService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllBooks();
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
}
