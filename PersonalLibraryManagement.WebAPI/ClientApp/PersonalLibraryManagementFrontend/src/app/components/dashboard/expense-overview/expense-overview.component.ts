import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.scss'],
})
export class ExpenseOverviewComponent implements OnInit {

  view: [number, number] = [700, 400]; // default view size

  ngOnInit() {
    this.adjustChartView(window.innerWidth);
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustChartView(event.target.innerWidth);
  }

  adjustChartView(width: number) {
    if (width < 600) {
      this.view = [width * 0.9, 300];  // 90% of screen width for small screens
    } else if (width < 1024) {
      this.view = [width * 0.45, 300]; // 45% of screen width for medium screens
    } else {
      this.view = [width * 0.35, 400]; // 45% of screen width for large screens
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

  // Bar chart data
  single = [
    {
      name: '2020',
      value: 3000,
    },
    {
      name: '2021',
      value: 5000,
    },
    {
      name: '2022',
      value: 4000,
    },
  ];

  categorySpending = [
    {
      name: 'Books',
      value: 1500,
    },
    {
      name: 'Electronics',
      value: 2500,
    },
    {
      name: 'Clothing',
      value: 1000,
    },
    {
      name: 'Food',
      value: 2000,
    },
  ];
}
