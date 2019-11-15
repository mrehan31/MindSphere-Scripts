import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import { AssetData } from '../model/asset-data';
import { CancelEdit } from '../model/cancel-edit';




@Component({
  selector: 'app-section-overview-ui',
  templateUrl: './section-overview-ui.component.html',
  styleUrls: ['./section-overview-ui.component.scss']
})
export class SectionOverviewUiComponent implements OnInit {

  // Asset data to be shown in this section
  @Input() assetData: AssetData = {
    name: '',
    description: '',
    variables: []
  };

  // Event emitted when assetData was edited.
  @Output() assetDataChange = new EventEmitter<AssetData>();

  // Indicates if the edit functionality is active
  @Input() isEditable = false;

  // View mode to control if the user
  // can see the edit or read subcomponent
  @Input() viewMode: 'read' | 'edit' = 'read';
  @Output() viewModeChange = new EventEmitter<'read' | 'edit'>();

  // Internal definition of which columns are
  // shown in the variables table.
  readonly displayedColumns: string[] = ['name', 'value'];

  constructor() {
  }

  ngOnInit() {
  }

  handleEditButtonClick(event: MouseEvent) {
    if (this.isEditable) {
      this.viewMode = 'edit';
      this.viewModeChange.emit(this.viewMode);
    }
  }

  handleEditSubmit(event: AssetData) {
    if (this.isEditable) {
      this.assetData = event;
      this.assetDataChange.emit(this.assetData);
    }
  }

  handleEditCancel(event: CancelEdit) {
    if (this.isEditable) {
      this.viewMode = 'read';
      this.viewModeChange.emit(this.viewMode);
    }
  }
}
