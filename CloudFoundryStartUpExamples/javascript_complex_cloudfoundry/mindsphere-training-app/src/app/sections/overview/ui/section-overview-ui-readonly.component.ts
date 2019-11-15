import { Component, OnInit, Input } from '@angular/core';
import { AssetData } from '../model/asset-data';

@Component({
  selector: 'app-section-overview-ui-readonly',
  templateUrl: './section-overview-ui-readonly.component.html',
  styleUrls: ['./section-overview-ui-readonly.component.scss']
})
export class SectionOverviewUiReadonlyComponent implements OnInit {

  // Asset data that will be shown in this component
  @Input() assetData: AssetData = {
    name: '{{NAME_PLACEHOLDER}}',
    description: '{{DESCRIPTION_PLACEHOLDER}}',
    variables: []
  };

  // Internal definition of which columns are
  // shown in the variables table.
  readonly displayedColumns: string[] = ['name', 'value'];

  constructor() { }

  ngOnInit() {
  }

}
