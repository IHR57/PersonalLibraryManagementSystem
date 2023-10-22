import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { Book } from '../models/Book';
import { ReadStatus } from '../models/ReadStatus';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent {
  booklist: Book[] = [
    {
      name: "1984",
      writer: "George Orwell",
      category: "Fiction",
      boughtDate: "21-10-2023",
      finishedDate: "25-10-2023",
      isFavourite: true,
      buyingPrice: 120,
      readStatus: ReadStatus.InProgress,
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
      readStatus: ReadStatus.InProgress,
      personalNotes: "",
      personalRating: 8,
      thumbnail: "",
      userId: ""
    },
    {
      name: "Animal Farm",
      writer: "George Orwell",
      category: "Fiction",
      boughtDate: "21-10-2023",
      finishedDate: "25-10-2023",
      isFavourite: true,
      buyingPrice: 120,
      readStatus: ReadStatus.InProgress,
      personalNotes: "",
      personalRating: 8,
      thumbnail: "",
      userId: ""
    },
    {
      name: "Animal Farm",
      writer: "George Orwell",
      category: "Fiction",
      boughtDate: "21-10-2023",
      finishedDate: "25-10-2023",
      isFavourite: true,
      buyingPrice: 120,
      readStatus: ReadStatus.InProgress,
      personalNotes: "",
      personalRating: 8,
      thumbnail: "",
      userId: ""
    }
  ];

  constructor(
    private libraryService: LibraryService,
  ) { }

  ngOnInit() {
    //this.getAllBooks();
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
