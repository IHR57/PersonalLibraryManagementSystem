import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyLibraryComponent } from './components/my-library/my-library.component';
import { AddBookDialogComponent } from './components/my-library/add-book-dialog/add-book-dialog.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { UpdateBookDialogComponent } from './components/my-library/update-book-dialog/update-book-dialog/update-book-dialog.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { BookDetailsComponent } from './components/my-library/book-details/book-details.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { DashboardMenuComponent } from './components/dashboard/dashboard-menu/dashboard-menu.component';
import { ExpenseOverviewComponent } from './components/dashboard/expense-overview/expense-overview.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    DashboardComponent,
    MyLibraryComponent,
    AddBookDialogComponent,
    UpdateBookDialogComponent,
    PaginationComponent,
    BookDetailsComponent,
    ConfirmationDialogComponent,
    DashboardMenuComponent,
    ExpenseOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    NgxChartsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
