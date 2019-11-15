import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { AggregationFunction } from '../model/aggregationfunction';


@Component({
  selector: 'app-section-data-ui-buttons',
  templateUrl: './section-data-ui-buttons.component.html',
  styleUrls: ['./section-data-ui-buttons.component.scss']
})
export class SectionDataUiButtonsComponent implements OnInit {

  // Currently selected function, i.e. button
  @Input() selectedFunction: AggregationFunction;

  // Event emitted when another button is selected
  @Output() selectedFunctionChanged = new EventEmitter<AggregationFunction>();

  constructor() { }

  ngOnInit() {
  }

  handleMinButtonClick(event: MouseEvent) {
    this.emitAggregationFunctionClickedEvent(AggregationFunction.Minimum);
  }

  handleMaxButtonClick(event: MouseEvent) {
    this.emitAggregationFunctionClickedEvent(AggregationFunction.Maximum);
  }

  handleAvgButtonClick(event: MouseEvent) {
    this.emitAggregationFunctionClickedEvent(AggregationFunction.Average);
  }

  handleSumButtonClick(event: MouseEvent) {
    this.emitAggregationFunctionClickedEvent(AggregationFunction.Sum);
  }

  emitAggregationFunctionClickedEvent(aggregationFunction: AggregationFunction) {
    if (this.selectedFunction !== aggregationFunction) {
      this.selectedFunction = aggregationFunction;
      this.selectedFunctionChanged.emit(this.selectedFunction);
    }
  }
}
