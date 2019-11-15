import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MaintenancePeriod } from '../ui/model/maintenance-period';
import { MaintenanceReport } from '../ui/model/maintenance-report';

import { AssetIdService } from 'src/app/services/asset-id.service';

import { Subject } from 'rxjs';
import { ResponseInfo } from '../ui/model/response-info';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceMindsphereService {


  assetId = this.assetIdService.assetId;

  responseInfo = new Subject<ResponseInfo | undefined>();
  responseInfo$ = this.responseInfo.asObservable();


  constructor(
    readonly http: HttpClient,
    readonly assetIdService: AssetIdService
  ) {
  }

  createMaintenancePeriod(maintenancePeriod: MaintenancePeriod) {
    this.responseInfo.next(undefined);

    console.log('Creating new Maintenance Period');

    const newBeginDate = this.getDateFromDateAndTime(
      maintenancePeriod.beginDate,
      maintenancePeriod.beginTime
    );

    const newEndDate = this.getDateFromDateAndTime(
      maintenancePeriod.endDate,
      maintenancePeriod.endTime);

    if (!newBeginDate.toJSON() || !newEndDate.toJSON()) {
      console.error('Wrong date format');
      this.responseInfo.next({ state: 'ERROR', errorMessage: 'Wrong date format'});
      return;
    }

    const requestBody = {
      assetId: this.assetId,
      beginDate: newBeginDate.toISOString(),
      endDate: newEndDate.toISOString(),
    };
    console.log(requestBody);

    this.http.post('/backend/maintenance/reports', requestBody)
      .subscribe(
        res => {
          console.log('Successfully created maintenance period.');
          this.responseInfo.next({ state: 'OK' });
        },
        err => {
          console.log('Could not create maintenance period', err);
          this.responseInfo.next({ state: 'ERROR', errorMessage: err.message });
        }
      );
  }

  createMaintenanceReport(maintenanceReport: MaintenanceReport) {
    this.responseInfo.next(undefined);

    console.log('Creating new Maintenance Report');

    const beginDate = maintenanceReport.maintenancePeriod.beginDate;
    const beginTime = maintenanceReport.maintenancePeriod.beginTime;
    const newBeginDate = this.getDateFromDateAndTime(beginDate, beginTime);

    const endDate = maintenanceReport.maintenancePeriod.endDate;
    const endTime = maintenanceReport.maintenancePeriod.endTime;
    const newEndDate = this.getDateFromDateAndTime(endDate, endTime);


    if (!newBeginDate.toJSON() || !newEndDate.toJSON()) {
      console.error('Wrong date format');
      this.responseInfo.next({ state: 'ERROR', errorMessage: 'Wrong date format'});
      return;
    }

    const requestBody = {
      assetId: this.assetId,
      beginDate: newBeginDate.toISOString(),
      endDate: newEndDate.toISOString(),
      maintainer: maintenanceReport.maintainer,
      description: maintenanceReport.description,
      reason: maintenanceReport.reason
    };

    this.http.post('/backend/maintenance/reports', requestBody)
      .subscribe(
        res => {
          console.log('Successfully created maintenance report.');
          this.responseInfo.next({ state: 'OK' });
        },
        err => {
          console.log('Could not create maintenance report', err);
          this.responseInfo.next({ state: 'ERROR', errorMessage: err.message });
        }
      );
  }

  getDateFromDateAndTime(date: Date, time: string): Date {
    const splitTime = time
      .split(':')
      .map(t => parseInt(t, 10));

    const resultDate = new Date(date);
    resultDate.setHours(splitTime[0], splitTime[1], 0);

    return resultDate;
  }
}
