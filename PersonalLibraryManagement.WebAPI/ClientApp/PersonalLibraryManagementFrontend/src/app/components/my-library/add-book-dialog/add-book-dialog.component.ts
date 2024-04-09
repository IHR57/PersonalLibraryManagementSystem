import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ReadStatus } from 'src/app/models/ReadStatus';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})

export class AddBookDialogComponent {
  writerSelctionOptions$ = new BehaviorSubject<string[]>([]);
  categorySelectionOptions$ = new BehaviorSubject<string[]>([]);
  isAddingBook$ = new BehaviorSubject<boolean>(false);

  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    writer: new FormControl('', Validators.required),
    description: new FormControl(''),
    boughtDate: new FormControl(),
    finishedDate: new FormControl(),
    buyingPrice: new FormControl(0),
    personalRating: new FormControl(0),
    personalNotes: new FormControl(''),
    status: new FormControl(ReadStatus.Pending.toString())
  });

  constructor(
    private libraryService: LibraryService,
    public dialogRef: MatDialogRef<AddBookDialogComponent>
  ) { }

  onTypeWriter() {
    this.getAllWriterBySearchInput();
  }

  onTypeCategory() {
    this.getAllCategoryBySearchInput();
  }

  getAllWriterBySearchInput() {
    this.libraryService.getAllWriters(this.bookForm.controls['writer'].value).subscribe({
      next: (response: any) => {
        this.writerSelctionOptions$.next(response.result);
      }
    })
  }

  getAllCategoryBySearchInput() {
    this.libraryService.getAllCategory(this.bookForm.controls['category'].value).subscribe({
      next: (response: any) => {
        this.categorySelectionOptions$.next(response.result);
      }
    })
  }

  addNewBook() {

    if(this.bookForm.invalid) {
      return;
    }
    
    this.isAddingBook$.next(true);
    this.bookForm.controls['status'].setValue(parseInt(this.bookForm.controls['status'].value));

    this.libraryService.addNewBook(this.bookForm.value)
    .subscribe({
      next: (response: any) => {
        console.log(response);
        this.isAddingBook$.next(false);
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        this.isAddingBook$.next(false);
      },
      complete: () => { }
    })
  }
}
