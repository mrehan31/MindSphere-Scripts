import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { AggregationFunction } from '../model/aggregationfunction';
import { AspectVariable } from '../model/aspect-variable';
import { AspectVariableEntry } from '../model/aspect-variable-entry';
import { ChartData } from '../model/chart-data';
import { SelectionData } from '../model/selection-data';


@Component({
  selector: 'app-section-data-ui',
  templateUrl: './section-data-ui.component.html',
  styleUrls: ['./section-data-ui.component.scss']
})
export class SectionDataUiComponent implements OnInit {

  // List of aspect variables to be displayed in drop down
  @Input() aspectVariables: AspectVariableEntry[] = [];

  // Current state of drop down and button group.
  @Input() selectionData: SelectionData = {
    aspectVariable: null,
    aggregationFunction: AggregationFunction.Minimum
  };

  // Event emitted when the current state of drop down or
  // button group changes
  @Output() selectionDataChanged = new EventEmitter<SelectionData>();

  // Data and related configuration for line chart
  @Input() chartData: ChartData = {
    name: 'No data',
    unit: '',
    timeUnit: 'month',
    data: []
  };

  constructor() { }

  ngOnInit() {
    // There is no preselection of an aspect variable
    // to make the trainees select one manually so that
    // they can observe what's happening more deliberately.
  }

  handleSelectionChanged(event: MatSelectChange) {
    const aspectVariable: AspectVariable = event.value;

    this.selectionData = {
      ...this.selectionData,
      aspectVariable
    };

    this.selectionDataChanged.emit(this.selectionData);
  }

  handleAggregationFunctionChanged(aggregationFunction: AggregationFunction) {
    this.selectionData = {
      ...this.selectionData,
      aggregationFunction
    };

    if (this.selectionData.aspectVariable) {
      this.selectionDataChanged.emit(this.selectionData);
    }
  }
}
