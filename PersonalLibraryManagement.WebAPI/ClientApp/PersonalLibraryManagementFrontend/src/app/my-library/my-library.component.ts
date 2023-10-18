import { Component } from '@angular/core';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss']
})
export class MyLibraryComponent {
  booklist: any = [];

  constructor(
    private libraryService: LibraryService,
  ) { }

  ngOnInit() {
    this.getAllBooks();
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
