import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReadStatus } from 'src/app/models/ReadStatus';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})

export class AddBookDialogComponent {
  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    writer: new FormControl('', Validators.required),
    description: new FormControl(''),
    boughtDate: new FormControl(''),
    finishedDate: new FormControl(''),
    buyingPrice: new FormControl(0),
    personalRating: new FormControl(0),
    personalNotes: new FormControl(''),
    status: new FormControl(1)
  });

  constructor(
    private libraryService: LibraryService,
  ) { }

  addNewBook() {
    this.libraryService.addNewBook(this.bookForm.value)
    .subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
      },
      complete: () => { 
      }
    })
  }
}
