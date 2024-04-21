import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ReadStatus } from 'src/app/models/ReadStatus';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-update-book-dialog',
  templateUrl: './update-book-dialog.component.html',
  styleUrls: ['./update-book-dialog.component.scss'],
})
export class UpdateBookDialogComponent {
  isUpdatingBook$ = new BehaviorSubject<boolean>(false);

  bookForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    writer: new FormControl('', Validators.required),
    description: new FormControl(''),
    boughtDate: new FormControl(),
    finishedDate: new FormControl(),
    buyingPrice: new FormControl(0),
    personalRating: new FormControl(0),
    personalNotes: new FormControl(''),
    status: new FormControl(ReadStatus.Pending.toString()),
  });

  constructor(
    private libraryService: LibraryService,
    public dialogRef: MatDialogRef<UpdateBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.bookForm.controls['id'].setValue(this.data.id);
    this.bookForm.controls['userId'].setValue(this.data.userId);
    this.bookForm.controls['name'].setValue(this.data.name);
    this.bookForm.controls['category'].setValue(this.data.category);
    this.bookForm.controls['writer'].setValue(this.data.writer);
    this.bookForm.controls['description'].setValue(this.data.description);
    this.bookForm.controls['boughtDate'].setValue(this.data.boughtDate);
    this.bookForm.controls['finishedDate'].setValue(this.data.finishedDate);
    this.bookForm.controls['buyingPrice'].setValue(this.data.buyingPrice);
    this.bookForm.controls['personalRating'].setValue(this.data.personalRating);
    this.bookForm.controls['personalNotes'].setValue(this.data.personalNotes);
    this.bookForm.controls['status'].setValue(parseInt(this.data.status));
  }

  updateBook() {
    if (this.bookForm.invalid) {
      return;
    }

    this.isUpdatingBook$.next(true);
    this.bookForm.controls['status'].setValue(
      parseInt(this.bookForm.controls['status'].value)
    );

    this.libraryService.updateBook(this.bookForm.value).subscribe({
      next: (response: any) => {
        this.isUpdatingBook$.next(false);
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        this.isUpdatingBook$.next(false);
      },
      complete: () => {
        this.dialogRef.close(true);
      },
    });
  }
}
