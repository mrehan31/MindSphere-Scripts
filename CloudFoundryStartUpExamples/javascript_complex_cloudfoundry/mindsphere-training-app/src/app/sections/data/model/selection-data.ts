import { AspectVariable } from './aspect-variable';
import { AggregationFunction } from './aggregationfunction';

export interface SelectionData {
    aspectVariable: AspectVariable | null;
    aggregationFunction: AggregationFunction;
}
