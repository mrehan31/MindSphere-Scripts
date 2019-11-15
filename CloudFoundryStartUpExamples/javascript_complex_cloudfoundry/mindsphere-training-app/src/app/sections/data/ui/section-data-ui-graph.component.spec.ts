import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChanges } from '@angular/core';

import { SectionDataUiGraphComponent } from './section-data-ui-graph.component';

describe('SectionDataUiGraphComponent', () => {
  let component: SectionDataUiGraphComponent;
  let fixture: ComponentFixture<SectionDataUiGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionDataUiGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDataUiGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default chart data', () => {
    expect(component.chart).toBeTruthy();
  });

  it('should instantiate the graph', () => {
    expect(component.chart).toBeTruthy();
  });

  it('should have a default label', () => {
    expect(component.chart.data.datasets[0].label).toBe('No data');
  });

  it('should have no legend if name is not set', () => {
    component.chartData = {
      name: '',
      unit: 'm',
      timeUnit: 'month',
      data: []
    };

    component.ngOnChanges({} as SimpleChanges);

    expect(component.chart.config.options.legend.display).toBe(false);
  });

  it('should not display unit if unit is not set', () => {
    component.chartData = {
      name: 'Weight',
      unit: '',
      timeUnit: 'month',
      data: []
    };

    component.ngOnChanges({} as SimpleChanges);

    expect(component.chart.data.datasets[0].label).toBe('Weight');
  });

  it('should rerender the graph when data is updated', () => {
    spyOn(component.chart, 'update');

    component.chartData = {
      name: 'A',
      unit: 'm',
      timeUnit: 'day',
      data: []
    };
    component.ngOnChanges({} as SimpleChanges);

    expect(component.chart.update).toHaveBeenCalled();
  });

  it('should set the label to "name (unit)"', () => {
    component.chartData = {
      name: 'A',
      unit: 'm',
      timeUnit: 'day',
      data: []
    };

    component.ngOnChanges({} as SimpleChanges);

    expect(component.chart.data.datasets[0].label).toBe('A (m)');
  });

  it('should set the time unit', () => {
    component.chartData = {
      name: 'A',
      unit: 'm',
      timeUnit: 'second',
      data: []
    };

    component.ngOnChanges({} as SimpleChanges);

    expect(component.chart.config.options.scales.xAxes[0].time.unit).toBe('second');
  });

  it('should replace the graph\'s data when setting new data', () => {
    component.chartData = {
      name: 'A',
      unit: 'm',
      timeUnit: 'day',
      data: [
        {
          date: new Date('2019-01-02'),
          value: 42
        },
        {
          date: new Date('2019-02-02'),
          value: 4711
        }
      ]
    };

    component.ngOnChanges({} as SimpleChanges);

    const data = component.chart.data.datasets[0].data;
    expect(data[0]).toEqual({t: new Date('2019-01-02'), y: 42});
    expect(data[1]).toEqual({t: new Date('2019-02-02'), y: 4711});
    expect(data.length).toEqual(2);
  });
});
