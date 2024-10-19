import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-expense-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.scss'],
})
export class ExpenseOverviewComponent implements OnInit {
  view: [number, number] = [700, 400];
  yearWiseExpenseList$ = new BehaviorSubject<any>([]);
  categoryWiseExpenseList$ = new BehaviorSubject<any>([]);
  totalExpenses$ = new BehaviorSubject<number>(0);

  ngOnInit() {
    this.adjustChartView(window.innerWidth);
    this.getYearlyTotalExpenses();
    this.getCategoryWiseTotalExpenses();
  }

  constructor(private dashboardService: DashboardService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustChartView(event.target.innerWidth);
  }

  adjustChartView(width: number) {
    if (width < 600) {
      this.view = [width * 0.9, 300];
    } else if (width < 1024) {
      this.view = [width * 0.45, 300];
    } else {
      this.view = [width * 0.35, 400];
    }
  }

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Money Spent';

  getYearlyTotalExpenses() {
    this.dashboardService.getYearlyTotalExpenses().subscribe({
      next: (response: any) => {
        const mappedExpenses = response.result.map((item: any) => ({
          name: item.year,
          value: item.totalExpenses,
        }));
        this.yearWiseExpenseList$.next(mappedExpenses);
        this.totalExpenses$.next(
          response.result.reduce(
            (acc: number, item: any) => acc + item.totalExpenses,
            0
          )
        );
      },
    });
  }

  getCategoryWiseTotalExpenses() {
    this.dashboardService.getCategoryWiseTotalExpenses().subscribe({
      next: (response: any) => {
        const mappedExpenses = response.result.map((item: any) => ({
          name: item.categoryName,
          value: item.totalExpenses,
        }));
        this.categoryWiseExpenseList$.next(mappedExpenses);
      },
    });
  }
}
