import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';

import { ChartData } from '../model/chart-data';
import { ChartDataPoint } from '../model/chart-data-point';

@Component({
  selector: 'app-section-data-ui-graph',
  templateUrl: './section-data-ui-graph.component.html',
  styleUrls: ['./section-data-ui-graph.component.scss']
})
export class SectionDataUiGraphComponent implements OnInit, AfterViewInit, OnChanges {
  // Internal reference to div housing the graph
  @ViewChild('timeseriesChart') myDiv: ElementRef;

  // Data and related configuration for line chart
  @Input() chartData: ChartData = {
    name: 'No data',
    unit: '',
    timeUnit: 'month',
    data: []
  };

  // Chart.JS line chart
  chart: Chart;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      this.updateChart();
    }
  }

  updateChart() {
    const newChartData = this.chartData;
    const dataset = this.chart.data.datasets[0];

    // configuration of the legend
    if (newChartData.name) {
      this.chart.config.options.legend.display = true;
      dataset.label = newChartData.name;
      if (newChartData.unit) {
        dataset.label += ` (${newChartData.unit})`;
      }
    } else {
      dataset.label = '';
      this.chart.config.options.legend.display = false;
    }

    // Map data from our format to Chart.JS internal format
    dataset.data = newChartData.data.map((d: ChartDataPoint) => ({ t: d.date, y: d.value } as Chart.ChartPoint));

    this.chart.config.options.scales.xAxes[0].time.unit = newChartData.timeUnit;

    // Call chart.update() to rerender the view
    this.chart.update();
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.myDiv.nativeElement, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        datasets: [{
          fill: false,
          borderColor: 'rgb(255, 99, 132)'
        }]
      },

      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }]
        }
      }
    });

    // configuration of the tooltips
    this.chart.config.options.tooltips.callbacks.label = (tooltipItem) => {
      let formatedLabel = (Math.round(Number(tooltipItem.yLabel) * 100) / 100).toString();
      if (this.chartData.unit) {
        formatedLabel += ` (${this.chartData.unit})`;
      }

      return formatedLabel;
    };

    this.updateChart();
  }

}
