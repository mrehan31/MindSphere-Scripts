import { Component, OnInit, Input } from '@angular/core';

import { MaintenanceMindsphereService } from '../services/maintenance-mindsphere.service';
import { MaintenancePeriod } from '../ui/model/maintenance-period';
import { MaintenanceReport } from '../ui/model/maintenance-report';


@Component({
  selector: 'app-section-maintenance',
  templateUrl: './section-maintenance.component.html',
  styleUrls: ['./section-maintenance.component.scss']
})
export class SectionMaintenanceComponent implements OnInit {

  // Defines if the form is in it's basic view or
  // in the extended view.
  // - Basic (false): Only start and end datetime
  // - Extended (true): Additional information
  @Input() extended = false;

  responseInfo$ = this.backendService.responseInfo$;

  constructor(
    readonly backendService: MaintenanceMindsphereService
  ) { }

  ngOnInit() {
  }

  handleMaintenancePeriodSubmitted(maintenancePeriod: MaintenancePeriod) {
    this.backendService.createMaintenancePeriod(maintenancePeriod);
  }

  handleMaintenanceReportSubmitted(maintenanceReport: MaintenanceReport) {
    this.backendService.createMaintenanceReport(maintenanceReport);
  }
}
