import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import { AggregationFunction } from '../model/aggregationfunction';
import { SectionDataUiButtonsComponent } from './section-data-ui-buttons.component';

describe('SectionDataUiButtonsComponent', () => {
  let component: SectionDataUiButtonsComponent;
  let fixture: ComponentFixture<SectionDataUiButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionDataUiButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDataUiButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select default button', () => {
    component.selectedFunction = AggregationFunction.Average;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('#agg-button-avg[class="mat-accent"]')).length).toBe(1);
  });

  it('should not select buttons other than default button', () => {
    // It should be sufficient to have this test
    // in combination with 'should select default button'
    // to test if only the correct default button is selected.
    component.selectedFunction = AggregationFunction.Average;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('button[class="mat-primary"]')).length).toBe(3);
  });

  it('should emit an minimum aggregationFunctionClicked event when clicking on Min button', () => {
    // Set the selectedFunction to a different value
    // than the value to be tested to have the event being emitted.
    component.selectedFunction = AggregationFunction.Maximum;

    // Subscribe first to not miss the event!
    component.selectedFunctionChanged
      .pipe(take(1))
      .subscribe((aggregationFunction: AggregationFunction) => {
        expect(aggregationFunction).toBe(AggregationFunction.Minimum);
      });

    fixture.debugElement.query(By.css('#agg-button-min')).nativeElement.click();

    // Additionally, emit a wrong value to track
    // if the correct value is emitted at all.
    component.selectedFunctionChanged.emit(AggregationFunction.Maximum);
  });

  it('should emit an maximum aggregationFunctionClicked event when clicking on Max button', () => {
    // Set the selectedFunction to a different value
    // than the value to be tested to have the event definitely being emitted.
    component.selectedFunction = AggregationFunction.Minimum;

    // Subscribe first to not miss the event!
    component.selectedFunctionChanged
      .pipe(take(1))
      .subscribe((aggregationFunction: AggregationFunction) => {
        expect(aggregationFunction).toBe(AggregationFunction.Maximum);
      });

    fixture.debugElement.query(By.css('#agg-button-max')).nativeElement.click();

     // Additionally, emit a wrong value to track
     // if the correct value has been emitted at all.
    component.selectedFunctionChanged.emit(AggregationFunction.Minimum);
  });

  it('should emit an average aggregationFunctionClicked event when clicking on Avg button', () => {
    // Set the selectedFunction to a different value
    // than the value to be tested to have the event definitely being emitted.
    component.selectedFunction = AggregationFunction.Minimum;

    // Subscribe first to not miss the event!
    component.selectedFunctionChanged
      .pipe(take(1))
      .subscribe((aggregationFunction: AggregationFunction) => {
        expect(aggregationFunction).toBe(AggregationFunction.Average);
      });

    fixture.debugElement.query(By.css('#agg-button-avg')).nativeElement.click();

     // Additionally, emit a wrong value to track
     // if the correct value has been emitted at all.
    component.selectedFunctionChanged.emit(AggregationFunction.Minimum);
  });

  it('should emit a sum aggregationFunctionClicked event when clicking on Sum button', () => {
    // Set the selectedFunction to a different value
    // than the value to be tested to have the event definitely being emitted.
    component.selectedFunction = AggregationFunction.Minimum;

    // Subscribe first to not miss the event!
    component.selectedFunctionChanged
      .pipe(take(1))
      .subscribe((aggregationFunction: AggregationFunction) => {
        expect(aggregationFunction).toBe(AggregationFunction.Sum);
      });

    fixture.debugElement.query(By.css('#agg-button-sum')).nativeElement.click();

     // Additionally, emit a wrong value to track
     // if the correct value has been emitted at all.
    component.selectedFunctionChanged.emit(AggregationFunction.Minimum);
  });

  it('should not emit event if min button already is selected and clicked again', () => {
    component.selectedFunction = AggregationFunction.Minimum;
    fixture.detectChanges();

    const expectedNoneValue = AggregationFunction.Maximum;

    // Subscribe first to not miss the event!
    component.selectedFunctionChanged
      .pipe(take(1))
      .subscribe((aggregationFunction: AggregationFunction) => {
        expect(aggregationFunction).toBe(expectedNoneValue);
      });

    fixture.debugElement.query(By.css('#agg-button-min')).nativeElement.click();
    component.selectedFunctionChanged.emit(expectedNoneValue);
  });

  it('should not emit event if max button already is selected and clicked again', () => {
    component.selectedFunction = AggregationFunction.Maximum;
    fixture.detectChanges();

    const expectedNoneValue = AggregationFunction.Minimum;

    // Subscribe first to not miss the event!
    component.selectedFunctionChanged
      .pipe(take(1))
      .subscribe((aggregationFunction: AggregationFunction) => {
        expect(aggregationFunction).toBe(expectedNoneValue);
      });

    fixture.debugElement.query(By.css('#agg-button-max')).nativeElement.click();
    component.selectedFunctionChanged.emit(expectedNoneValue);
  });

  it('should not emit event if avg button already is selected and clicked again', () => {
    component.selectedFunction = AggregationFunction.Average;
    fixture.detectChanges();

    const expectedNoneValue = AggregationFunction.Minimum;

    // Subscribe first to not miss the event!
    component.selectedFunctionChanged
      .pipe(take(1))
      .subscribe((aggregationFunction: AggregationFunction) => {
        expect(aggregationFunction).toBe(expectedNoneValue);
      });

    fixture.debugElement.query(By.css('#agg-button-avg')).nativeElement.click();
    component.selectedFunctionChanged.emit(expectedNoneValue);
  });

  it('should not emit event if sum button already is selected and clicked again', () => {
    component.selectedFunction = AggregationFunction.Sum;
    fixture.detectChanges();

    const expectedNoneValue = AggregationFunction.Minimum;

    // Subscribe first to not miss the event!
    component.selectedFunctionChanged
      .pipe(take(1))
      .subscribe((aggregationFunction: AggregationFunction) => {
        expect(aggregationFunction).toBe(expectedNoneValue);
      });

    fixture.debugElement.query(By.css('#agg-button-sum')).nativeElement.click();
    component.selectedFunctionChanged.emit(expectedNoneValue);
  });

  it('should highlight the clicked button', () => {
    fixture.debugElement
      .queryAll(By.css('button'))
      .forEach(btn => {
        btn.nativeElement.click();
        fixture.detectChanges();

        expect(btn.classes['mat-accent']).toBeTruthy();
        expect(btn.classes['mat-primary']).toBeFalsy();
      });
  });

  it('should highlight exactly one button after clicking it', () => {
    fixture.debugElement
      .queryAll(By.css('button'))
      .forEach(btn => {
        btn.nativeElement.click();
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('.mat-primary')).length).toBe(3);
      });
  });
});
