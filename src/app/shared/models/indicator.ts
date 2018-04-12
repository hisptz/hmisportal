export interface Indicator {
  id: string;
  title: string;
  description?: string;
  cardClass?: string;
  visualization_type?: string;
  chart?: string;
  data: {name: string, uid: string}[];
  higher_level?: boolean;
  yAxisType?: string;
}
