import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { PieChartDatas } from 'src/app/core/models/PieChartDatas';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements AfterViewInit {
  @Input() data!: PieChartDatas;
  
  // Récupération du canvas dans le template HTML
  @ViewChild('pieChartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chartInstance!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Nettoyer l'ancienne instance si elle existe
    }

    this.chartInstance = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: this.data,
    });
  }
}
