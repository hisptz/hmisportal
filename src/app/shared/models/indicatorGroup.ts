import {Indicator} from './indicator';

export interface IndicatorGroup {
  id: string;
  title: string;
  indicators: string[];
  items?: Indicator[];
}
