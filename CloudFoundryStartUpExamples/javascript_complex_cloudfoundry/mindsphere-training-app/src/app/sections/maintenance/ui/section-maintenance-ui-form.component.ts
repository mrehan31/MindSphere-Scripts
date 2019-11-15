import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MaintenancePeriod } from './model/maintenance-period';
import { MaintenanceReport } from './model/maintenance-report';
import { ResponseInfo } from './model/response-info';


@Component({
  selector: 'app-section-maintenance-ui-form',
  templateUrl: './section-maintenance-ui-form.component.html',
  styleUrls: ['./section-maintenance-ui-form.component.scss']
})
export class SectionMaintenanceUiFormComponent implements OnInit {

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

  // State variable for the begin date. Bound to datepicker
  beginDate = new Date();

  // State variable for the begin time. Bound to input field
  beginTime = '00:00';

  // State variable for the end date. Bound to datepicker
  endDate = new Date();

  // State variable for the end time. Bound to input field
  endTime = '00:00';

  // State variable for maintainer.
  maintainer = '';

  // State variable for reason
  reason = '';

  // State varibale for description.
  description = '';

  constructor() { }

  ngOnInit() {
  }

  handleSubmitButtonClick(event: MouseEvent) {
    if (this.extended) {
      this.maintenanceReport.emit(this.createMaintenanceReport());
    } else {
      this.maintenancePeriod.emit(this.createMaintenancePerdiod());
    }
  }

  createMaintenancePerdiod(): MaintenancePeriod {
    return {
      beginDate: this.beginDate,
      beginTime: this.beginTime,
      endDate: this.endDate,
      endTime: this.endTime
    };
  }

  createMaintenanceReport(): MaintenanceReport {
    return {
      maintenancePeriod: this.createMaintenancePerdiod(),
      maintainer: this.maintainer,
      reason: this.reason,
      description: this.description
    };
  }
}
