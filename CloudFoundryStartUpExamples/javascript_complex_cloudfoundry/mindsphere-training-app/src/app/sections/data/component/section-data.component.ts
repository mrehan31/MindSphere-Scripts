import { Component, OnInit } from '@angular/core';

import { DataMindsphereService } from '../services/data-mindsphere.service';
import { SelectionData } from '../model/selection-data';

@Component({
  selector: 'app-section-data',
  templateUrl: './section-data.component.html',
  styleUrls: ['./section-data.component.scss']
})
export class SectionDataComponent implements OnInit {

  aspectVariables$ = this.apiService.aspectVariables$;

  aggregationData$ = this.apiService.aggregationData$;


  constructor(
    readonly apiService: DataMindsphereService
  ) { }

  ngOnInit() {
  }

  handleSelectionDataChange(selectionData: SelectionData) {
    this.apiService.selectionData.next(selectionData);
  }

}
