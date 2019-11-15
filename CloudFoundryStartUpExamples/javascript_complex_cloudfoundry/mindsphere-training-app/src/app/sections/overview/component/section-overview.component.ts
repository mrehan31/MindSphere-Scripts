import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AssetData } from '../model/asset-data';
import { OverviewMindsphereService } from '../services/overview-mindsphere.service';

@Component({
  selector: 'app-section-overview',
  templateUrl: './section-overview.component.html',
  styleUrls: ['./section-overview.component.scss']
})
export class SectionOverviewComponent implements OnInit {

  // Indicates if the edit functionality is active
  @Input() isEditable = false;

  viewMode: 'read' | 'edit';


  assetData$ = this.overviewMindsphereService.asset$;

  constructor(
    public overviewMindsphereService: OverviewMindsphereService
  ) {
  }

  ngOnInit() {
    this.viewMode = 'read';
  }

  handleAssetDataChange(assetData: AssetData) {
    this.overviewMindsphereService.writeAssetData(assetData)
      .pipe(
        tap(() => {
          this.viewMode = 'read';
        })
      )
      .subscribe(
        res => {
          console.log('Sent data to api');
        },
        err => { console.error('Sending data to api ended with error', err); }
      );
  }

}
