import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MaintenancePeriod } from './model/maintenance-period';
import { MaintenanceReport } from './model/maintenance-report';
import { ResponseInfo } from './model/response-info';

@Component({
  selector: 'app-section-maintenance-ui',
  templateUrl: './section-maintenance-ui.component.html',
  styleUrls: ['./section-maintenance-ui.component.scss']
})
export class SectionMaintenanceUiComponent implements OnInit {

  // Defines if the form is in it's basic view or
  // in the extended view.
  // - Basic (false): Only start and end datetime
  // - Extended (true): Additional information
  @Input() extended = false;

  // Information on the state of the response after form submission.
  @Input() responseInfo?: ResponseInfo;

  // Event emitting only the maintenance period in basic mode
  @Output() maintenancePeriod = new EventEmitter<MaintenancePeriod>();

  // Event emitting a full maintenance report in extended mode
  @Output() maintenanceReport = new EventEmitter<MaintenanceReport>();

  constructor() { }

  ngOnInit() {
  }

  handleMaintenancePeriodSubmitted(maintenancePeriod: MaintenancePeriod) {
    this.maintenancePeriod.emit(maintenancePeriod);
  }

  handleMaintenanceReportSubmitted(maintenanceReport: MaintenanceReport) {
    this.maintenanceReport.emit(maintenanceReport);
  }

}
