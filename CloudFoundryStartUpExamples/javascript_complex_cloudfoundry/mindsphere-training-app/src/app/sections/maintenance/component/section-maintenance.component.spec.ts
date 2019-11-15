import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatTableModule
} from '@angular/material';
import { of } from 'rxjs';

import { MaintenancePeriod } from '../ui/model/maintenance-period';
import { MaintenanceReport } from '../ui/model/maintenance-report';
import { ResponseInfo } from '../ui/model/response-info';
import { SectionMaintenanceComponent } from './section-maintenance.component';
import { SectionMaintenanceUiComponent } from '../ui/section-maintenance-ui.component';
import { SectionMaintenanceUiFormComponent } from '../ui/section-maintenance-ui-form.component';

describe('SectionMaintenanceComponent', () => {
  let component: SectionMaintenanceComponent;
  let fixture: ComponentFixture<SectionMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SectionMaintenanceComponent,
        SectionMaintenanceUiComponent,
        SectionMaintenanceUiFormComponent
       ],
       imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatTableModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [true, false].forEach(isExtended => {
    it(`should bind extended=${isExtended} to ui component`, () => {
      component.extended = isExtended;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.directive(SectionMaintenanceUiComponent)).componentInstance.extended).toBe(isExtended);
    });
  });

  it('should forward new maintenancePeriod to backend service', () => {
    const newMaintenancePeriod = {
      beginDate: new Date(),
      beginTime: '12:01',
      endDate: new Date(),
      endTime: '12:05'
    } as MaintenancePeriod;

    spyOn(component.backendService, 'createMaintenancePeriod');

    fixture.debugElement.query(By.directive(SectionMaintenanceUiComponent))
      .componentInstance
      .maintenancePeriod
      .emit(newMaintenancePeriod);

    fixture.detectChanges();

    expect(component.backendService.createMaintenancePeriod).toHaveBeenCalledWith(newMaintenancePeriod);
  });

  it('should forward new maintenanceReport to backend service', () => {
    const newMaintenanceReport = {
      maintenancePeriod: {
        beginDate: new Date(),
        beginTime: '12:01',
        endDate: new Date(),
        endTime: '12:05'
      },
      maintainer: 'John Doe',
      description: 'Test Description',
      reason: 'Test reason'
    } as MaintenanceReport;

    spyOn(component.backendService, 'createMaintenanceReport');

    fixture.debugElement.query(By.directive(SectionMaintenanceUiComponent))
      .componentInstance
      .maintenanceReport
      .emit(newMaintenanceReport);

    fixture.detectChanges();

    expect(component.backendService.createMaintenanceReport).toHaveBeenCalledWith(newMaintenanceReport);
  });

  it('should forward responseInfo to UI component', () => {
    const responseInfo = {} as ResponseInfo;

    component.responseInfo$ = of(responseInfo);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(SectionMaintenanceUiComponent)).componentInstance.responseInfo).toBe(responseInfo);
  });
});
