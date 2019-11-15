import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AssetData } from '../model/asset-data';
import { CancelEdit } from '../model/cancel-edit';


@Component({
  selector: 'app-section-overview-ui-edit',
  templateUrl: './section-overview-ui-edit.component.html',
  styleUrls: ['./section-overview-ui-edit.component.scss']
})
export class SectionOverviewUiEditComponent implements OnInit {

  // Asset data that will be shown in this component
  @Input() assetData: AssetData = {
    name: '',
    description: '',
    variables: []
  };

  // Change event emitted when submit button is being hit
  @Output() assetDataChange = new EventEmitter<AssetData>();

  // Event emitted when cancel button is clicked.
  @Output() cancel = new EventEmitter<CancelEdit>();

  // Internal deep copy of assetData to decouple
  // incomming data from changes made in input elements.
  assetDataClone: AssetData;

  constructor() { }

  ngOnInit() {
    // Make a deep copy so that changes don't affect
    // the original object immediately.
    this.assetDataClone = {
      ...this.assetData,
      variables: this.assetData.variables.map(x => ({...x}))
    };
  }

  handleSubmitButtonClick(event: MouseEvent) {
    this.assetDataChange.emit(this.assetDataClone);
  }

  handleCancelButtonClick(event: MouseEvent) {
    this.cancel.emit(new CancelEdit());
  }
}
