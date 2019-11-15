import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatBadgeModule, MatSelectModule } from '@angular/material';
import { take } from 'rxjs/operators';

import { AggregationFunction } from '../model/aggregationfunction';
import { AspectVariable } from '../model/aspect-variable';
import { SectionDataUiButtonsComponent } from './section-data-ui-buttons.component';
import { SectionDataUiComponent } from './section-data-ui.component';
import { SectionDataUiGraphComponent } from './section-data-ui-graph.component';
import { SelectionData } from '../model/selection-data';


describe('SectionDataUiComponent', () => {
  let component: SectionDataUiComponent;
  let fixture: ComponentFixture<SectionDataUiComponent>;
  let buttonComponent: SectionDataUiButtonsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SectionDataUiComponent,
        SectionDataUiButtonsComponent,
        SectionDataUiGraphComponent],
      imports: [
        BrowserAnimationsModule,
        MatSelectModule,
        MatBadgeModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDataUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('generally', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it(`should show 'Data' as title`, () => {
      expect(fixture.nativeElement.querySelector('.title').textContent).toContain('Data');
    });

    it('should not have any aspect variables right after instantiation', () => {
      expect(component.aspectVariables.length).toBe(0);
    });

    it('should not have a selected aspect variable as default', () => {
      expect(component.selectionData.aspectVariable).toBeNull();
    });

    it('should have Minimum as selected default aggregation function', () => {
      expect(component.selectionData.aggregationFunction).toBe(AggregationFunction.Minimum);
    });

    it('should not display timeseries-container if there are no variables', () => {
      // This also is currently the default. Just in case
      // that may change in the future set it to [] again.
      component.aspectVariables = [];
      fixture.detectChanges();

      const timeseriesContainer = fixture.nativeElement.querySelector('.timeseries-container');
      expect(timeseriesContainer).toBeFalsy();
    });

    it('should not have any time series data right after instantiation', () => {
      expect(component.chartData.data.length).toBe(0);
    });
  });

  describe('with aspect variables', () => {
    beforeEach(() => {
      component.aspectVariables = [{ id: { aspect: 'A', variable: 'V', unit: 'U' }, displayText: 'T' }];
      fixture.detectChanges();

      buttonComponent = fixture.debugElement.query(By.css('app-section-data-ui-buttons')).componentInstance;
    });

    it('should add all variables to select control', async () => {
      component.aspectVariables = [
        { id: { aspect: 'firstAspect', variable: 'var1', unit: 'u1' }, displayText: 'firstText' },
        { id: { aspect: 'secondAspect', variable: 'var2', unit: 'u2' }, displayText: 'secondText' },
        { id: { aspect: 'thirdAspect', variable: 'var3', unit: 'u3' }, displayText: 'thirdText' }
      ];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('mat-select')).nativeElement.click();

      fixture.detectChanges();

      const firstMatOption = fixture.debugElement.queryAll(By.css('mat-option'));
      expect(firstMatOption.length).toBe(component.aspectVariables.length);
    });

    it('should map aspectVariable to mat-option value', async () => {
      const aspectVariable: AspectVariable = { aspect: 'firstAspect', variable: 'var1', unit: 'u1' };

      component.aspectVariables = [
        { id: aspectVariable, displayText: 'firstText' }
      ];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('mat-select')).nativeElement.click();

      fixture.detectChanges();

      const firstMatOption = fixture.debugElement.query(By.css('mat-option'));
      expect(firstMatOption.componentInstance.value).toBe(aspectVariable);
    });

    it('should map aspectVariables displayText to mat-option text', async () => {
      fixture.debugElement.query(By.css('mat-select')).nativeElement.click();

      fixture.detectChanges();

      const firstMatOption = fixture.debugElement.query(By.css('mat-option'));
      expect(firstMatOption.nativeElement.textContent).toContain('T');
    });

    it('should emit selectionDataChanged event when button component changes.', () => {
      component.selectionData = {
        aspectVariable: { aspect: 'A', variable: 'V', unit: 'u1' },
        aggregationFunction: AggregationFunction.Minimum
      };

      fixture.detectChanges();

      // Subscribe before emitting events
      component.selectionDataChanged
        .pipe(take(1))
        .subscribe((v: SelectionData) => {
          expect(v.aggregationFunction).toBe(AggregationFunction.Maximum);
        });

      buttonComponent.selectedFunctionChanged.emit(AggregationFunction.Maximum);

      // Emit a second, wrong value to track
      // if something is emited at all.
      component.selectionDataChanged.emit({
        aggregationFunction: AggregationFunction.Sum
      } as SelectionData);
    });

    it('should not emit an selectionDataChanged event when no aspect variable has been selected', () => {
      const dummySelectionData = {} as SelectionData;

      // Actually, this simply replicates the default
      // at the current state. But just set it in case
      // the default might change in the future.
      component.selectionData = {
        ...component.selectionData,
        aspectVariable: null
      };

      component.selectionDataChanged
        .pipe(take(1))
        .subscribe((selectionData: SelectionData) => {
          // Expect the dummySelection and not the previously
          // emitted Maximum function.
          expect(selectionData).toBe(dummySelectionData);
        });

      buttonComponent.selectedFunctionChanged.emit(AggregationFunction.Maximum);

      component.selectionDataChanged.emit(dummySelectionData);
    });

    it('should emit an selectionDataChanged event when the selection changes', () => {
      const targetAspectVariable: AspectVariable = { aspect: 'secondAspect', variable: 'var2', unit: 'u2' };

      component.aspectVariables = [
        { id: { aspect: 'firstAspect', variable: 'var1', unit: 'u1' }, displayText: 'firstText' },
        { id: targetAspectVariable, displayText: 'secondText' },
        { id: { aspect: 'thirdAspect', variable: 'var3', unit: 'u3' }, displayText: 'thirdText' }
      ];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('mat-select')).nativeElement.click();

      fixture.detectChanges();

      component.selectionDataChanged
        .pipe(take(1))
        .subscribe((selectionData: SelectionData) => {
          expect(selectionData.aspectVariable).toBe(targetAspectVariable);
        });

      fixture.debugElement.query(By.css('mat-option:nth-child(2)')).nativeElement.click();
      fixture.detectChanges();

      // Additionally, emit a wrong value to track
      // if the correct value is emitted at all.
      component.selectionDataChanged.emit({ aspectVariable: { aspect: 'WrongAspect', variable: 'WrongVariable' } } as SelectionData);
    });

    it('should display timeseries-container if there are variables', () => {
      const timeseriesContainer = fixture.nativeElement.querySelector('.timeseries-container');
      expect(timeseriesContainer).toBeTruthy();
    });
  });
});
