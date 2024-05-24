import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  pieChartLabels: string[] = ['English', 'Math'];
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['English', 'Math'],
    datasets: [
      {
        data: [350, 450],
        backgroundColor: ['#26547c', '#ff6b6b', '#ffd166'],
      },
    ],
  };
  pieChartType: ChartType = 'pie';
  pieChartOptions: any = {};

  constructor() {}

  // Event handler for chart click event
  public onChartClick(event: any): void {
    console.log(event);
  }
  ngOnInit(): void {}
}
