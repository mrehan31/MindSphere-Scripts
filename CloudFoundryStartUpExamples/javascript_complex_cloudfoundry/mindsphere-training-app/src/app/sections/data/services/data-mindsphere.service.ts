import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, startWith, switchMap, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { AggregationFunction } from '../model/aggregationfunction';
import { AspectVariableEntry } from '../model/aspect-variable-entry';
import { AssetIdService } from 'src/app/services/asset-id.service';
import { ChartData } from '../model/chart-data';
import { ChartDataPoint } from '../model/chart-data-point';
import { SelectionData } from '../model/selection-data';

@Injectable({
  providedIn: 'root'
})
export class DataMindsphereService {

  readonly assetId = this.assetIdService.assetId;

  // Collection of available aspect variables.
  // Subscribe to this to fill select box.
  aspectVariables$: Observable<AspectVariableEntry[]> =
    this.http.get<any>(
      `/api/assetmanagement/v3/assets/${this.assetId}/aspects`, {
        params: {
          filter: JSON.stringify({ name: { in: [ 'Metrics', 'PressureIn', 'PressureOut' ] }})
        }
      })
      .pipe(
        tap(res => console.log(`/api/assetmanagement/v3/assets/${this.assetId}/aspects`)),
        map(res => this.mapAspectsResultToAspectVariables(res)),
        startWith([]),
        catchError(err => {
          console.error(err);
          return of([]);
        }));

  // Subject to receive selection data change events.
  selectionData = new Subject<SelectionData>();

  // This observable reacts on selectionData and requests
  // aggreation data from tsa endpoint.
  aggregationData$: Observable<ChartData> =
    this.selectionData
      .pipe(
        switchMap(selectionData => this.getAggregateTimeSeriesData(selectionData)),
        startWith({
          data: [],
          name: 'No Data',
          unit: '',
          timeUnit: ''
          })
      );


  constructor(
    readonly http: HttpClient,
    readonly assetIdService: AssetIdService
  ) {}

  mapAspectsResultToAspectVariables(response: any): AspectVariableEntry[] {
    return response._embedded.aspects
      .flatMap(aspect => aspect.variables
        .flatMap(variable => ({
          id: {
            aspect: aspect.name,
            variable: variable.name,
            unit: variable.unit
          },
          displayText: `${variable.name} (${aspect.name})`
        } as AspectVariableEntry)));
  }

  getAggregateTimeSeriesData(selectionData: SelectionData): Observable<any> {
    const functionString = {
      [AggregationFunction.Minimum]: 'minvalue',
      [AggregationFunction.Maximum]: 'maxvalue',
      [AggregationFunction.Average]: 'average',
      [AggregationFunction.Sum]: 'sum'
    }[selectionData.aggregationFunction];

    const variable = selectionData.aspectVariable.variable;

    return this.http.get<any>(
      `/api/iottsaggregates/v3/aggregates/${this.assetId}/${selectionData.aspectVariable.aspect}`, {
        params: {
          from: '2019-04-17T11:30:00Z',
          to: '2019-04-17T14:30:00Z',
          intervalValue: '1',
          intervalUnit: 'minute',
          select: `${variable}.${functionString}`
        }
      })
      .pipe(
        map(res => ({
          data: this.mapAggregateValuesToDataPoint(res, variable, functionString),
          name: variable,
          timeUnit: 'minute',
          unit: selectionData.aspectVariable.unit
        } as ChartData)),
      );
  }

  mapAggregateValuesToDataPoint(aggregateEntries: any[], variable: string, functionString: string): ChartDataPoint[] {
    return aggregateEntries
      .filter(entry => entry.starttime && entry[variable])
      .map(entry => ({
        date: new Date(entry.starttime),
        value: entry[variable][functionString]
      } as ChartDataPoint));
  }

}
