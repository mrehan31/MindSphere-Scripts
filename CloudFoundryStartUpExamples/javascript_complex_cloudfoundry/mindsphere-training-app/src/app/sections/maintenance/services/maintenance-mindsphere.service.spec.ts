import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MaintenanceMindsphereService } from './maintenance-mindsphere.service';

describe('MaintenanceMindsphereService', () => {
  let service: MaintenanceMindsphereService;
  let http: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(MaintenanceMindsphereService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a correct date object from date and time', () => {
    const date = new Date('2019-02-03T12:42Z');
    const time = '00:00';

    const result = service.getDateFromDateAndTime(date, time);
    expect(result).toEqual(new Date('2019-02-03T00:00:00'));
  });

  it('should send maintenance report to backend', () => {
    service.createMaintenanceReport({
      maintenancePeriod: {
        beginDate: new Date('2019-03-03T08:47Z'),
        beginTime: '17:24',
        endDate: new Date('2019-03-03T08:47Z'),
        endTime: '17:28'
      },
      maintainer: 'John Doe',
      description: 'TestDescription',
      reason: 'TestReason'
    });

    const request = http.expectOne(req => req.url.match(/\/backend\/maintenance\/reports$/) && req.method === 'POST');

    expect(request.request.body).toEqual({
      beginDate: new Date('2019-03-03T17:24:00.000').toISOString(),
      endDate: new Date('2019-03-03T17:28:00.000').toISOString(),
      maintainer: 'John Doe',
      description: 'TestDescription',
      reason: 'TestReason'
    });

    http.verify();
  });

  it('should not send maintenance report to backend when beginDate is invalid', () => {
    service.createMaintenanceReport({
      maintenancePeriod: {
        beginDate: new Date('2019-03-03T08:47Z'),
        beginTime: '17:xy', // This typo is intended ;)
        endDate: new Date('2019-03-03T08:47Z'),
        endTime: '17:28'
      },
      maintainer: 'John Doe',
      description: 'TestDescription',
      reason: 'TestReason'
    });

    http.expectNone(req => !!req.url.match(/\/backend\/maintenance\/reports$/));
    http.verify();
  });

  it('should not send maintenance report to backend when endDate is invalid', () => {
    service.createMaintenanceReport({
      maintenancePeriod: {
        beginDate: new Date('2019-03-03T08:47Z'),
        beginTime: '17:24', // This typo is intended ;)
        endDate: new Date('2019-03-03T08:47Z'),
        endTime: '17:xy'
      },
      maintainer: 'John Doe',
      description: 'TestDescription',
      reason: 'TestReason'
    });

    http.expectNone(req => !!req.url.match(/\/backend\/maintenance\/reports$/));
    http.verify();
  });

  it('should send maintenance period to backend', () => {
    service.createMaintenancePeriod({
      beginDate: new Date('2019-03-03T08:47Z'),
      beginTime: '17:24',
      endDate: new Date('2019-03-03T08:50Z'),
      endTime: '17:28'
    });

    const request = http.expectOne(req => req.url.match(/\/backend\/maintenance\/reports$/) && req.method === 'POST');

    expect(request.request.body).toEqual({
      beginDate: new Date('2019-03-03T17:24:00.000').toISOString(),
      endDate: new Date('2019-03-03T17:28:00.000').toISOString()
    });

    http.verify();
  });

  it('should not send maintenance period to backend when beginDate is invalid', () => {
    service.createMaintenancePeriod({
      beginDate: new Date('2019-03-03T08:47Z'),
      beginTime: '17:xy', // This typo is intended ;)
      endDate: new Date('2019-03-03T08:47Z'),
      endTime: '17:28'
    });

    http.expectNone(req => !!req.url.match(/\/backend\/maintenance\/reports$/));
    http.verify();
  });

  it('should not send maintenance period to backend when endDate is invalid', () => {
    service.createMaintenancePeriod({
      beginDate: new Date('2019-03-03T08:47Z'),
      beginTime: '17:24',
      endDate: new Date('2019-03-03T08:47Z'),
      endTime: '17:xy' // This typo is intended ;)
    });

    http.expectNone(req => !!req.url.match(/\/backend\/maintenance\/reports$/));
    http.verify();
  });
});
