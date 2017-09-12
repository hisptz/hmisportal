import {Component, Input, OnInit} from '@angular/core';
import {VisualizerService} from "../services/visualizer.service";
import {CHART_TYPES} from "../chart_types";

@Component({
  moduleId: module.id,
  selector: 'app-indicatordisplay',
  templateUrl: './indicatordisplay.component.html',
  styleUrls: ['./indicatordisplay.component.css']
})
export class IndicatordisplayComponent implements OnInit {

  @Input() indicator: any;
  @Input() selected_ou_name: any;
  chartTypes = CHART_TYPES;
  constructor(private viualizer: VisualizerService) { }

  ngOnInit() {
  }

  updateType(type, item) {
    item.visualizerType = type;
  }

  setOptions(type, item) {
    item.showOptions = type;
  }

  updateChartType(type, item) {
    item.chart = type;
    const chartConfiguration = {
      type: item.chart,
      title: item.title,
      xAxisType: 'ou',
      yAxisType: 'dx',
      show_labels: false
    };
    item.chartObject = this.viualizer.drawChart(item.analytics, chartConfiguration);
  }

}
