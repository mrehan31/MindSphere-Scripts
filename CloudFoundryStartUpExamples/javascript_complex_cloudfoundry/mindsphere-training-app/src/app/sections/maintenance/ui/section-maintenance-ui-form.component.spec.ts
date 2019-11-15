import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatIconModule } from '@angular/material';
import { take } from 'rxjs/operators';

import { MaintenancePeriod } from './model/maintenance-period';
import { SectionMaintenanceUiFormComponent } from './section-maintenance-ui-form.component';
import { exec } from 'child_process';
import { MaintenanceReport } from './model/maintenance-report';

describe('SectionMaintenanceUiFormComponent', () => {
  let component: SectionMaintenanceUiFormComponent;
  let fixture: ComponentFixture<SectionMaintenanceUiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionMaintenanceUiFormComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMaintenanceUiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('generally', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not display additional fields', () => {
      expect(fixture.debugElement.query(By.css('#maintenance-extended'))).toBeFalsy();
    });

    it('should display beginTime in input field', () => {
      component.beginTime = '12:22';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('input[placeholder="Begin Time"]')).nativeElement.value).toBe('12:22');
      });
    });

    it('should write begin time to beginTime', () => {
      const beginTimeField = fixture.debugElement.query(By.css('input[placeholder="Begin Time"]')).nativeElement;
      beginTimeField.value = '12:42';
      beginTimeField.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        expect(component.beginTime).toBe('12:42');
      });
    });

    it('should display endTime in input field', () => {
      component.endTime = '12:22';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('input[placeholder="End Time"]')).nativeElement.value).toBe('12:22');
      });
    });

    it('should write begin time to endTime', () => {
      const endTimeField = fixture.debugElement.query(By.css('input[placeholder="End Time"]')).nativeElement;
      endTimeField.value = '12:42';
      endTimeField.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        expect(component.endTime).toBe('12:42');
      });
    });

    it('should show submitted message when responseInfo is OK', () => {
      component.responseInfo = { state: 'OK' };
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.response-field-ok'))).toBeTruthy();
    });

    it('should show error message when responseInfo is ERROR', () => {
      component.responseInfo = { state: 'ERROR', errorMessage: 'Something went wrong' };
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.response-field-error'))).toBeTruthy();
    });

    it('should not show any response message when responseInfo is undefined', () => {
      component.responseInfo = undefined;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.response-field'))).toBeFalsy();
    });
  });

  describe('when extended==false', () => {
    beforeEach(() => {
      component.extended = false;
    });

    it('should emit a maintenancePeriod event when hitting subscribe', () => {
      const dummyEvent = {} as MaintenancePeriod;

      component.maintenancePeriod
        .pipe(take(1))
        .subscribe(e => {
          expect(e).not.toBe(dummyEvent);
        });

      fixture.debugElement.query(By.css('#maintenance-submit-button')).nativeElement.click();
      fixture.detectChanges();

      component.maintenancePeriod.emit(dummyEvent);
    });

    it('should emit a maintenancePeriod event with values from the input fields', () => {
      const expectedMaintenancePeriod: MaintenancePeriod = {
        beginDate: new Date('2019-01-05'),
        beginTime: '14:42',
        endDate: new Date('2019-01-06'),
        endTime: '14:55'
      };

      Object.assign(component, expectedMaintenancePeriod);

      component.maintenancePeriod
        .pipe(take(1))
        .subscribe(maintenancePeriod => {
          expect(maintenancePeriod).toEqual(expectedMaintenancePeriod);
        });

      fixture.debugElement.query(By.css('#maintenance-submit-button')).nativeElement.click();
      fixture.detectChanges();

      // Emit dummy event to trigger the subscription above
      // at least once.
      component.maintenancePeriod.emit({} as MaintenancePeriod);
    });
  });

  describe('when in extended mode', () => {
    beforeEach(() => {
      component.extended = true;
      fixture.detectChanges();
    });

    it('should display additional fields', () => {
      expect(fixture.debugElement.query(By.css('#maintenance-extended'))).toBeTruthy();
    });

    it('should display maintainer in input field', () => {
      component.maintainer = 'John Doe';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('input[placeholder=Maintainer]')).nativeElement.value).toBe('John Doe');
      });
    });

    it('should write maintainer to maintainer', () => {
      const maintainerField = fixture.debugElement.query(By.css('input[placeholder=Maintainer]')).nativeElement;
      maintainerField.value = 'John Doe';
      maintainerField.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        expect(component.maintainer).toBe('John Doe');
      });
    });

    it('should display reason in input field', () => {
      component.reason = 'John Doe';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('input[placeholder=Reason]')).nativeElement.value).toBe('John Doe');
      });
    });

    it('should write reason to reason', () => {
      const reasonField = fixture.debugElement.query(By.css('input[placeholder=Reason]')).nativeElement;
      reasonField.value = 'John Doe';
      reasonField.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        expect(component.reason).toBe('John Doe');
      });
    });

    it('should display description in input field', () => {
      component.description = 'John Doe';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('input[placeholder=Description]')).nativeElement.value).toBe('John Doe');
      });
    });

    it('should write description to description', () => {
      const descriptionField = fixture.debugElement.query(By.css('input[placeholder=Description]')).nativeElement;
      descriptionField.value = 'John Doe';
      descriptionField.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        expect(component.description).toBe('John Doe');
      });
    });

    it('should emit an maintenanceReport event when hitting submit', () => {
      const dummyEvent = {} as MaintenanceReport;

      component.maintenanceReport
        .pipe(take(1))
        .subscribe(e => {
          expect(e).not.toBe(dummyEvent);
        });

      fixture.debugElement.query(By.css('#maintenance-submit-button')).nativeElement.click();
      fixture.detectChanges();

      component.maintenanceReport.emit(dummyEvent);
    });

    it('should emit a maintenanceReport event with values from the input fields', () => {
      const expectedMaintenancePeriod: MaintenancePeriod = {
        beginDate: new Date('2019-01-05'),
        beginTime: '14:42',
        endDate: new Date('2019-01-06'),
        endTime: '14:55'
      };

      const expectedAdditionalInfo = {
        maintainer: 'John Doe',
        reason: 'Periodical maintenance',
        description: 'Total breakdown prevented at the last minute.'
      };

      const expectedReport: MaintenanceReport = {
        maintenancePeriod: expectedMaintenancePeriod,
        ...expectedAdditionalInfo
      };

      Object.assign(component, expectedMaintenancePeriod);
      Object.assign(component, expectedAdditionalInfo);

      component.maintenanceReport
        .pipe(take(1))
        .subscribe(maintenanceReport => {
          expect(maintenanceReport).toEqual(expectedReport);
        });

      fixture.debugElement.query(By.css('#maintenance-submit-button')).nativeElement.click();
      fixture.detectChanges();

      // Emit dummy event to trigger the subscription above
      // at least once.
      component.maintenancePeriod.emit({} as MaintenancePeriod);
    });
  });
});
