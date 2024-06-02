import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  bookId = new BehaviorSubject<string>("");
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.bookId.next(this.route.snapshot.paramMap.get('id') || '');
    this.getBookDetailsById();
  }

  getBookDetailsById() {
    this.libraryService.getBookDetailsById(this.bookId.value).subscribe({
      next: (response: any) => {
        this.book = response;
        console.log(this.book);
      },
    });
  }
}
