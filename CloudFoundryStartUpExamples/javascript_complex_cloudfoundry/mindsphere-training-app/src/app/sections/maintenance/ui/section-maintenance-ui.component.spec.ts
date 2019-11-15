import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatTableModule
} from '@angular/material';

import { MaintenancePeriod } from './model/maintenance-period';
import { SectionMaintenanceUiComponent } from './section-maintenance-ui.component';
import { SectionMaintenanceUiFormComponent } from './section-maintenance-ui-form.component';
import { take } from 'rxjs/operators';
import { MaintenanceReport } from './model/maintenance-report';
import { ResponseInfo } from './model/response-info';

describe('SectionMaintenanceUiComponent', () => {
  let component: SectionMaintenanceUiComponent;
  let fixture: ComponentFixture<SectionMaintenanceUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SectionMaintenanceUiComponent,
        SectionMaintenanceUiFormComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
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
    fixture = TestBed.createComponent(SectionMaintenanceUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form component', () => {
    expect(fixture.debugElement.query(By.directive(SectionMaintenanceUiFormComponent))).toBeTruthy();
  });

  [true, false].forEach(isExtended => {
    it(`should bind extended=${isExtended} to ui component`, () => {
      component.extended = isExtended;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.directive(SectionMaintenanceUiFormComponent)).componentInstance.extended).toBe(isExtended);
    });
  });

  it('should forward maintenancePeriod', () => {
    const newMaintenancePeriod = {} as MaintenancePeriod;

    component.maintenancePeriod
    .pipe(take(1))
    .subscribe(mp => expect(mp).toBe(newMaintenancePeriod));

    fixture.debugElement.query(By.directive(SectionMaintenanceUiFormComponent))
      .componentInstance
      .maintenancePeriod
      .emit(newMaintenancePeriod);

    // Emit a dummy event to see if an event has been emitted at all.
    component.maintenancePeriod.emit({} as MaintenancePeriod);
  });

  it('should forward maintenanceReport', () => {
    const newMaintenanceReport = {} as MaintenanceReport;

    component.maintenanceReport
    .pipe(take(1))
    .subscribe(mp => expect(mp).toBe(newMaintenanceReport));

    fixture.debugElement.query(By.directive(SectionMaintenanceUiFormComponent))
      .componentInstance
      .maintenanceReport
      .emit(newMaintenanceReport);

    // Emit a dummy event to see if an event has been emitted at all.
    component.maintenanceReport.emit({} as MaintenanceReport);
  });

  it('should forward responseInfo', () => {
    const responseInfo = {} as ResponseInfo;

    component.responseInfo = responseInfo;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(SectionMaintenanceUiFormComponent)).componentInstance.responseInfo).toBe(responseInfo);
  });
});
