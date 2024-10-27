import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  fileForm: FormGroup;
  fileTypeError: boolean = false;
  allowedFileTypes: string[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.fileForm = this.fb.group({
      file: [null, Validators.required]
    });
    this.allowedFileTypes = data.allowedFileTypes;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileForm.patchValue({ file });
      if (this.allowedFileTypes.includes(file.type)) {
        this.fileTypeError = false;
        this.selectedFile = file;
      } else {
        this.fileTypeError = true;
      }
    }
  }

  onSubmit() {
    if (this.fileForm.valid && !this.fileTypeError) {
      this.dialogRef.close(this.selectedFile);
    } else {
      this.fileForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
