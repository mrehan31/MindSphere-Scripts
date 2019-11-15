import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataMindsphereService } from './data-mindsphere.service';
import { of, concat } from 'rxjs';
import { AspectVariableEntry } from '../model/aspect-variable-entry';
import { skip, take, delay } from 'rxjs/operators';
import { AggregationFunction } from '../model/aggregationfunction';
import { ChartData } from '../model/chart-data';

describe('DataMindsphereService', () => {

  let service: DataMindsphereService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(DataMindsphereService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to [] in aspectVariables$', () => {
    const ave = {} as AspectVariableEntry;
    const aspectVariablesUnderTest = concat(
      service.aspectVariables$.pipe(take(1)),
      of([ave])
    );

    aspectVariablesUnderTest
      .pipe(take(1))
      .subscribe(res => expect(res).toEqual([]));

    // Also test that actually something is coming through
    aspectVariablesUnderTest
      .pipe(skip(1))
      .subscribe(res => expect(res[0]).toBe(ave));
  });

  it('should add AspectVariableEntry[] to aspectVariables observable', async () => {
    service.aspectVariables$
      .pipe(skip(1)) // Skip default
      .subscribe(res => expect(res).toEqual([
        {
          id: {
            aspect: 'FirstAspect',
            variable: 'FirstVariable',
            unit: 'TestUnit'
          },
          displayText: 'FirstVariable (FirstAspect)'
        }
      ]));

    const request = httpMock.expectOne(req => req.url.match(/\/api\/assetmanagement\/v3\/assets.*/) && req.method === 'GET');

    request.flush({
      _embedded: {
        aspects: [
          {
            name: 'FirstAspect',
            variables: [
              {
                name: 'FirstVariable',
                unit: 'TestUnit'
              }
            ]
          }
        ]
      }
    });

    httpMock.verify();
  });

  it('should send a default value to aggregationData$ subscribers', () => {
    const aggregationDataTest = concat(
      service.aggregationData$,
      of({} as ChartData));

    aggregationDataTest
      .pipe(take(1))
      .subscribe(res => expect(res.name).toBe('No Data'));
  });

  it('should select passed aggregation function to endpoint', () => {
    service.getAggregateTimeSeriesData({
      aspectVariable: {
        aspect: 'TestAspect',
        variable: 'TestVariable',
        unit: 'TestUnit'
      },
      aggregationFunction: AggregationFunction.Average
    }).subscribe();

    const request = httpMock.expectOne(req => req.url.match(/.*\/aggregates\/[a-z0-9]+\/TestAspect$/) && req.method === 'GET');

    expect(request.request.params.get('select')).toBe('TestVariable.average');

    request.flush([]);
    httpMock.verify();
  });

  it('should map endpoint data to chart data', () => {
    service.getAggregateTimeSeriesData({
      aspectVariable: {
        aspect: 'TestAspect',
        variable: 'TestVariable',
        unit: 'TestUnit'
      },
      aggregationFunction: AggregationFunction.Average
    }).subscribe(res => {
      expect(res).toEqual({
        data: [
          {
            date: new Date('2019-01-01T01:00:00Z'),
            value: 42
          },
          {
            date: new Date('2019-01-02T01:00:00Z'),
            value: 4711
          }
        ],
        name: 'TestVariable',
        unit: 'TestUnit',
        timeUnit: 'second'
      } as ChartData);
    });

    const request = httpMock.expectOne(req => req.url.match(/.*\/aggregates\/[a-z0-9]+\/TestAspect$/) && req.method === 'GET');

    request.flush([
      {
        TestVariable: {
          average: 42
        },
        starttime: '2019-01-01T01:00:00Z',
        endtime: '2019-01-01T02:00:00Z'
      },
      {
        TestVariable: {
          average: 4711
        },
        starttime: '2019-01-02T01:00:00Z',
        endtime: '2019-01-02T02:00:00Z'
      }
    ]);

    httpMock.verify();
  });

  it('should ignore data points without expected variable', () => {
    service.getAggregateTimeSeriesData({
      aspectVariable: {
        aspect: 'TestAspect',
        variable: 'TestVariable',
        unit: 'TestUnit'
      },
      aggregationFunction: AggregationFunction.Average
    }).subscribe(res => expect(res.data.length).toBe(0));

    const request = httpMock.expectOne(req => req.url.match(/.*\/aggregates\/[a-z0-9]+\/TestAspect$/) && req.method === 'GET');

    request.flush([
      {
        starttime: '2019-01-01T01:00:00Z',
        endtime: '2019-01-01T02:00:00Z'
      },
      {
        starttime: '2019-01-02T01:00:00Z',
        endtime: '2019-01-02T02:00:00Z'
      }
    ]);

    httpMock.verify();
  });

  it('should ignore data points without starttime', () => {
    service.getAggregateTimeSeriesData({
      aspectVariable: {
        aspect: 'TestAspect',
        variable: 'TestVariable',
        unit: 'TestUnit'
      },
      aggregationFunction: AggregationFunction.Average
    }).subscribe(res => expect(res.data.length).toBe(0));

    const request = httpMock.expectOne(req => req.url.match(/.*\/aggregates\/[a-z0-9]+\/TestAspect$/) && req.method === 'GET');

    request.flush([
      {
        TestVariable: {
          average: 42
        },
        endtime: '2019-01-01T02:00:00Z'
      },
      {
        TestVariable: {
          average: 4711
        },
        endtime: '2019-01-02T02:00:00Z'
      }
    ]);

    httpMock.verify();
  });

});
