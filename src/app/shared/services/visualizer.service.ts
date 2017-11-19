import {Injectable} from '@angular/core';
import 'leaflet';
import * as _ from 'lodash';
import {ColorInterpolationService} from './map-services/color-interpolation.service';
declare var L;
@Injectable()
export class VisualizerService {
  enable_labels = false;

  constructor(private colorInterpolation: ColorInterpolationService,) {
  }

  drawChart(analyticObject: any, chartConfiguration: any) {
    let chartObject = null;
    if (!chartConfiguration.hasOwnProperty('show_labels')) {
      chartConfiguration.show_labels = false;
    }
    switch (chartConfiguration.type) {
      case 'bar':
        chartObject = this.drawOtherCharts(analyticObject, chartConfiguration);
        chartObject.plotOptions = {
          bar: {
            dataLabels: {
              enabled: chartConfiguration.show_labels
            }
          }
        };
        break;
      case 'column':
        chartObject = this.drawOtherCharts(analyticObject, chartConfiguration);
        chartObject.plotOptions = {
          column: {
            dataLabels: {
              enabled: chartConfiguration.show_labels
            }
          }
        };
        break;
      case 'radar':
        chartObject = this.drawSpiderChart(analyticObject, chartConfiguration);
        break;
      case 'stacked_column':
        chartConfiguration.stackingType = 'column';
        chartObject = this.drawStackedChart(analyticObject, chartConfiguration);
        break;
      case 'stacked_bar':
        chartConfiguration.stackingType = 'bar';
        chartObject = this.drawStackedChart(analyticObject, chartConfiguration);
        break;
      case 'gauge':
        chartObject = this.drawGaugeChart(analyticObject, chartConfiguration);
        break;
      case 'combined':
        chartObject = this.drawCombinedChart(analyticObject, chartConfiguration);
        chartObject.plotOptions = {
          column: {
            dataLabels: {
              enabled: chartConfiguration.show_labels
            }
          }
        };
        break;
      case 'line':
        chartObject = this.drawOtherCharts(analyticObject, chartConfiguration);
        chartObject.plotOptions = {
          line: {
            dataLabels: {
              enabled: chartConfiguration.show_labels
            }
          }
        };
        break;
      case 'area':
        chartObject = this.drawOtherCharts(analyticObject, chartConfiguration);
        chartObject.plotOptions = {
          area: {
            dataLabels: {
              enabled: chartConfiguration.show_labels
            }
          }
        };
        break;
      case 'pie':
        chartObject = this.drawPieChart(analyticObject, chartConfiguration);
        break;
      default :
        chartObject = this.drawOtherCharts(analyticObject, chartConfiguration);
        break;
    }
    chartObject.credits = {enabled: false};
    return chartObject;
  }

  /**
   * finding the position of the item in rows- used when fetching data
   * @param analyticsObjectHeaders : Array
   * @param name : String ['ou','dx','co','pe',....]
   * @returns {number}
   * @private
   */
  _getTitleIndex(analyticsObjectHeaders, name: string) {
    let index = 0;
    let counter = 0;
    for (const header of analyticsObjectHeaders) {
      if (header.name === name) {
        index = counter;
      }
      counter++;
    }
    return index;
  }

  _sanitizeIncomingAnalytics(analyticsObject: any) {
    for (const header of analyticsObject.headers) {
      if (header.hasOwnProperty('optionSet')) {
        if (analyticsObject.metaData[header.name].length === 0) {
          analyticsObject.metaData[header.name] = this._getRowItems(
            this._getTitleIndex(analyticsObject.headers, header.name), analyticsObject.rows);
          for (const item of analyticsObject.metaData[header.name]) {
            analyticsObject.metaData.names[item] = item;
          }

        } else {
          for (const item of analyticsObject.metaData[header.name]) {
            analyticsObject.metaData.names[item] = item;
          }
        }
      }
    }

    return analyticsObject;
  }

  _getRowItems(position: number, array) {
    const return_array = [];
    for (const item of array) {
      if (return_array.indexOf(item[position]) === -1) {
        return_array.push(item[position]);
      }
    }
    return return_array;
  }

  /**
   * Get an array of specified metadata
   * @param analyticsObject : Result from analytics call
   * @param metadataType : String ['ou','dx','co','pe',....]
   * @returns {Array}
   */
  getMetadataArray(analyticsObject, metadataType: string) {
    let metadataArray = [];
    if (metadataType === 'dx') {
      metadataArray = analyticsObject.metaData.dx;
    } else if (metadataType === 'ou') {
      metadataArray = analyticsObject.metaData.ou;
    } else if (metadataType === 'co') {
      metadataArray = analyticsObject.metaData.co;
    } else if (metadataType === 'pe') {
      metadataArray = analyticsObject.metaData.pe;
    } else {
      metadataArray = analyticsObject.metaData[metadataType];
    }
    return metadataArray;
  }

  /**
   * Return a detailed metadata with names and ids for a selected metadata
   * @param analyticsObject : Result from analytics call
   * @param metadataType : String ['ou','dx','co','pe',....]
   * @returns {Array}
   */
  getDetailedMetadataArray(analyticsObject, metadataType: string) {
    const metadataArray = [];
    analyticsObject = this._sanitizeIncomingAnalytics(analyticsObject);
    for (const item of analyticsObject.metaData[metadataType]) {
      metadataArray.push({
        id: item,
        name: analyticsObject.metaData.names[item]
      });
    }
    return metadataArray;
  }

  /**
   * return the meaningfull array of xAxis and yAxis Items
   * x axisItems and yAxisItems are specified if you want few data type array['uid1','uid2'], ie a subset of all available items
   * @param analyticsObject
   * @param xAxis : String ['ou','dx','co','pe',....]
   * @param yAxis : String ['ou','dx','co','pe',....]
   * @param xAxisItems : Array
   * @param yAxisItems : Array
   * @returns {{xAxisItems: Array, yAxisItems: Array}}
   */
  prepareCategories(analyticsObject, xAxis: string, yAxis: string, xAxisItems = [], yAxisItems = []) {
    analyticsObject = this._sanitizeIncomingAnalytics(analyticsObject);
    const structure = {
      'xAxisItems': [],
      'yAxisItems': []
    };
    if (xAxisItems.length === 0) {
      for (const val of this.getMetadataArray(analyticsObject, xAxis)) {
        structure.xAxisItems.push({'name': analyticsObject.metaData.names[val], 'uid': val});
      }
    }
    if (xAxisItems.length !== 0) {
      for (const val of xAxisItems) {
        structure.xAxisItems.push({'name': analyticsObject.metaData.names[val], 'uid': val});
      }
    }
    if (yAxisItems.length !== 0) {
      for (const val of yAxisItems) {
        structure.yAxisItems.push({'name': analyticsObject.metaData.names[val], 'uid': val});
      }
    }
    if (yAxisItems.length === 0) {
      for (const val of this.getMetadataArray(analyticsObject, yAxis)) {
        structure.yAxisItems.push({'name': analyticsObject.metaData.names[val], 'uid': val});
      }
    }
    return structure;
  }

  /**
   * return the meaningful array of single selection only
   * @param analyticsObject
   * @param xAxis
   * @param xAxisItems
   * @returns {{xAxisItems: Array, yAxisItems: Array}}
   */
  prepareSingleCategories(analyticsObject, itemIdentifier, preDefinedItems = []) {
    analyticsObject = this._sanitizeIncomingAnalytics(analyticsObject);
    const structure = [];
    if (preDefinedItems.length === 0) {
      for (const val of this.getMetadataArray(analyticsObject, itemIdentifier)) {
        structure.push({'name': analyticsObject.metaData.names[val], 'uid': val, 'type': itemIdentifier});
      }
    }
    if (preDefinedItems.length !== 0) {
      for (const val of preDefinedItems) {
        structure.push({'name': analyticsObject.metaData.names[val], 'uid': val, 'type': itemIdentifier});
      }
    }
    return structure;
  }

  /**
   * try to find data from the rows of analytics object
   * @param analyticsObject : Result from analytics call
   * @param dataItems : Array of data to check each array item is an object
   * [{'type':'ou','value':'bN5q5k5DgLA'},{'type': 'dx', 'value': 'eLo4RXcQIi5'}....]
   * @returns {number}
   */
  getDataValue(analyticsObject, dataItems = []) {
    let num = null;
    for (const value of analyticsObject.rows) {
      let counter = 0;
      for (const item of dataItems) {
        if (value[this._getTitleIndex(analyticsObject.headers, item.type)] === item.value) {
          counter++;
        }
      }
      if (counter === dataItems.length) {
        if (isNaN(value[this._getTitleIndex(analyticsObject.headers, 'value')])) {
          num = value[this._getTitleIndex(analyticsObject.headers, 'value')];
        } else {
          num += parseFloat(value[this._getTitleIndex(analyticsObject.headers, 'value')]);
        }
      }
    }
    return num;
  }

  getAutoGrowingDataValue(analyticsObject, dataItems = []) {
    let num: any;

    for (const value of analyticsObject.rows) {
      let counter = 0;
      for (const item of dataItems) {
        if (value[this._getTitleIndex(analyticsObject.headers, item.type)] === item.value) {
          counter++;
        }
      }
      if (counter === dataItems.length) {
        num = value[this._getTitleIndex(analyticsObject.headers, 'value')];
      }


    }
    return num;
  }

  // TODO: Implement the map details here

  /**
   * preparing an item to pass on the getDataValue function
   * separated here since it is used by all our chart drawing systems
   * @param chartConfiguration
   * @param xAxis
   * @param yAxis
   * @returns {Array}
   */
  getDataObject(chartConfiguration, xAxis, yAxis) {
    const dataItems = [];
    dataItems.push({'type': chartConfiguration.xAxisType, 'value': xAxis.uid});
    dataItems.push({'type': chartConfiguration.yAxisType, 'value': yAxis.uid});
    if (chartConfiguration.hasOwnProperty('filterType')) {
      dataItems.push({'type': chartConfiguration.filterType, 'value': chartConfiguration.filterUid});
    }
    return dataItems;
  }

  /**
   * Draw a pie chart
   * @param analyticsObject
   * @param chartConfiguration : object {'title':'','xAxisType':'',yAxisType:'','filterType':''} (filterType is optional)
   * @returns {{options, series}|any}
   */
  drawPieChart(analyticsObject, chartConfiguration) {

    const chartObject = this.getChartConfigurationObject('pieChart', chartConfiguration.show_labels);
    chartObject.title.text = chartConfiguration.title;
    const metaDataObject = this.prepareCategories(
      analyticsObject,
      chartConfiguration.xAxisType,
      chartConfiguration.yAxisType,
      chartConfiguration.xAxisItems,
      chartConfiguration.yAxisItems
    );
    const serie = [];
    for (const yAxis of metaDataObject.yAxisItems) {
      for (const xAxis of metaDataObject.xAxisItems) {
        const dataItems = this.getDataObject(chartConfiguration, xAxis, yAxis);
        const number = this.getDataValue(analyticsObject, dataItems);
        serie.push({
          'name': yAxis.name + ' - ' + xAxis.name,
          'y': number
        });
      }
    }
    chartObject.series.push({
      name: chartConfiguration.title,
      data: serie,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    });
    return chartObject;
  }

  /**
   * drawing combined chart
   * @param analyticsObject
   * @param chartConfiguration : object {'title':'','xAxisType':'',yAxisType:'','filterType':''} (filterType is optional)
   * @returns {{title, chart, xAxis, yAxis, labels, series}|any}
   */
  drawCombinedChart(analyticsObject, chartConfiguration) {
    const chartObject = this.getChartConfigurationObject('defaultChartObject', chartConfiguration.show_labels);
    chartObject.title.text = chartConfiguration.title;
    chartObject.chart.type = '';
    const pieSeries = [];
    const metaDataObject = this.prepareCategories(analyticsObject,
      chartConfiguration.xAxisType,
      chartConfiguration.yAxisType,
      (chartConfiguration.hasOwnProperty('xAxisItems')) ? chartConfiguration.xAxisItems : [],
      (chartConfiguration.hasOwnProperty('yAxisItems')) ? chartConfiguration.yAxisItems : []
    );
    // set x-axis categories
    chartObject.xAxis.categories = [];
    for (const val of metaDataObject.xAxisItems) {
      chartObject.xAxis.categories.push(val.name);
    }
    chartObject.series = [];
    for (const yAxis of metaDataObject.yAxisItems) {
      const barSeries = [];
      for (const xAxis of metaDataObject.xAxisItems) {
        const dataItems = this.getDataObject(chartConfiguration, xAxis, yAxis);
        const number = this.getDataValue(analyticsObject, dataItems);
        barSeries.push(number);
        pieSeries.push({'name': yAxis.name + ' - ' + xAxis.name, 'y': number});
      }
      chartObject.series.push({type: 'column', name: yAxis.name, data: barSeries});
      chartObject.series.push({type: 'spline', name: yAxis.name, data: barSeries});
      if (chartConfiguration.hasOwnProperty('show_pie') && chartConfiguration.show_pie) {
        chartObject.series.push({type: 'pie', name: yAxis.name, data: pieSeries});
      }
    }
    return chartObject;
  }

  /**
   * draw other charts
   * @param analyticsObject
   * @param chartConfiguration : Object {'type':'line','title': 'My chart', 'xAxisType': 'pe', 'yAxisType': 'dx' ....}
   * @returns {{title, chart, xAxis, yAxis, labels, series}|any}
   */
  drawOtherCharts(analyticsObject, chartConfiguration) {
    const chartObject = this.getChartConfigurationObject('defaultChartObject', chartConfiguration.show_labels);
    if (chartConfiguration.type === 'bar') {
      chartObject.chart.type = chartConfiguration.type;
      chartObject.xAxis.labels.rotation = 0;
    } else {
      chartObject.chart.type = '';
    }
    chartObject.title.text = chartConfiguration.title;
    const metaDataObject = this.prepareCategories(analyticsObject,
      chartConfiguration.xAxisType,
      chartConfiguration.yAxisType,
      (chartConfiguration.hasOwnProperty('xAxisItems')) ? chartConfiguration.xAxisItems : [],
      (chartConfiguration.hasOwnProperty('yAxisItems')) ? chartConfiguration.yAxisItems : []
    );
    chartObject.xAxis.categories = [];
    for (const val of metaDataObject.xAxisItems) {
      chartObject.xAxis.categories.push(val.name);
    }
    chartObject.series = [];
    for (const yAxis of metaDataObject.yAxisItems) {
      const chartSeries = [];
      for (const xAxis of metaDataObject.xAxisItems) {
        const dataItems = this.getDataObject(chartConfiguration, xAxis, yAxis);
        const number = this.getDataValue(analyticsObject, dataItems);
        chartSeries.push(number);
      }
      chartObject.series.push({
        type: chartConfiguration.type,
        name: yAxis.name, data: chartSeries
      });
    }
    return chartObject;
  }

  /**
   *
   * @param analyticsObject
   * @param chartConfiguration - same as when your drawing bar, line, column chart
   * @returns {Array} - in a format ready to be consumed by the ng2CSV library (https://github.com/javiertelioz/angular2-csv)
   */
  getCsvData(analyticsObject, chartConfiguration) {
    const data = [];
    const chartObject = this.drawOtherCharts(analyticsObject, chartConfiguration);
    for (const value of chartObject.series) {
      const obj = {name: value.name};
      let i = 0;
      for (const val of chartObject.xAxis.categories) {
        obj[val] = value.data[i];
        i++;
      }
      data.push(obj);
    }
    return data;
  }

  /**
   *
   * @param analyticsObject
   * @param chartConfiguration :Object {'stackingType':'[bar,column]','title': 'My chart', 'xAxisType': 'pe', 'yAxisType': 'dx' ....}
   * @returns {any}
   */
  drawStackedChart(analyticsObject, chartConfiguration) {

    // decide which chart object to use
    const chartObject = ( chartConfiguration.stackingType === 'bar' ) ?
      this.getChartConfigurationObject('barStackedObject', chartConfiguration.show_labels) :
      this.getChartConfigurationObject('stackedChartObject', chartConfiguration.show_labels);

    chartObject.title.text = chartConfiguration.title;
    const metaDataObject = this.prepareCategories(analyticsObject,
      chartConfiguration.xAxisType,
      chartConfiguration.yAxisType,
      (chartConfiguration.hasOwnProperty('xAxisItems')) ? chartConfiguration.xAxisItems : [],
      (chartConfiguration.hasOwnProperty('yAxisItems')) ? chartConfiguration.yAxisItems : []
    );
    chartObject.xAxis.categories = [];
    chartObject.series = [];
    for (const val of metaDataObject.xAxisItems) {
      chartObject.xAxis.categories.push(val.name);
    }
    for (const yAxis of metaDataObject.yAxisItems) {
      const chartSeries = [];
      for (const xAxis of metaDataObject.xAxisItems) {
        const dataItems = this.getDataObject(chartConfiguration, xAxis, yAxis);
        const number = this.getDataValue(analyticsObject, dataItems);
        chartSeries.push(number);
      }
      chartObject.series.push({
        name: yAxis.name,
        data: chartSeries
      });
    }
    return chartObject;
  }

  /**
   * drawing a solid gauge graph ( needs inclusion of module/solid-gauge )
   * @param analyticsObject
   * @param chartConfiguration :Object {'maximum_score':'maximum for gauge[100]','title': 'My chart', ....}
   * @returns {{chart, title, pane, tooltip, yAxis, plotOptions, credits, series}|any}
   */
  drawGaugeChart(analyticsObject, chartConfiguration) {
    const chartObject = this.getChartConfigurationObject('gaugeObject', chartConfiguration.show_labels);
    chartObject.title.text = chartConfiguration.title;
    const metaDataObject = this.prepareCategories(analyticsObject,
      chartConfiguration.xAxisType,
      chartConfiguration.yAxisType,
      (chartConfiguration.hasOwnProperty('xAxisItems')) ? chartConfiguration.xAxisItems : [],
      (chartConfiguration.hasOwnProperty('yAxisItems')) ? chartConfiguration.yAxisItems : []
    );
    let gaugeValue = 0;
    for (const yAxis of metaDataObject.yAxisItems) {
      const chartSeries = [];
      for (const xAxis of metaDataObject.xAxisItems) {
        const dataItems = this.getDataObject(chartConfiguration, xAxis, yAxis);
        const number = this.getDataValue(analyticsObject, dataItems);
        chartSeries.push(number);
        gaugeValue = number;
      }
    }
    chartObject.series = [];
    chartObject.yAxis.max = (chartConfiguration.hasOwnProperty('maximum_score')) ? chartConfiguration.maximun_score : 100;
    chartObject.series.push({
      name: chartConfiguration.title,
      data: [gaugeValue],
      tooltip: {
        valueSuffix: ' '
      }
    });
    return chartObject;
  }

  /**
   * drawing a spider chart ( needs inclusion of highcharts-more )
   * @param analyticsObject
   * @param chartConfiguration
   * @returns {{chart: {polar: boolean, type: string, events:
   * * {load: ((chart:any)=>undefined)}}, title: {text: any, x: number},
   * pane: {size: string}, xAxis: {categories: Array, tickmarkPlacement: string, lineWidth: number},
   * yAxis: {gridLineInterpolation: string, lineWidth: number, min: number},
   * tooltip: {shared: boolean},
   * legend: {align: string, verticalAlign: string, y: number, layout: string},
   * series: Array}}
   */
  drawSpiderChart(analyticsObject, chartConfiguration) {
    const metaDataObject = this.prepareCategories(analyticsObject,
      chartConfiguration.xAxisType,
      chartConfiguration.yAxisType,
      (chartConfiguration.hasOwnProperty('xAxisItems')) ? chartConfiguration.xAxisItems : [],
      (chartConfiguration.hasOwnProperty('yAxisItems')) ? chartConfiguration.yAxisItems : []
    );
    const categories = [];
    for (const val of metaDataObject.xAxisItems) {
      categories.push(val.name);
    }

    const series = [];
    for (const yAxis of metaDataObject.yAxisItems) {
      const chartSeries = [];
      for (const xAxis of metaDataObject.xAxisItems) {
        const dataItems = this.getDataObject(chartConfiguration, xAxis, yAxis);
        const number = this.getDataValue(analyticsObject, dataItems);
        chartSeries.push(number);
      }
      series.push({name: yAxis.name, data: chartSeries, pointPlacement: 'on'});
    }
    const piechartObject = {
      chart: {
        polar: true,
        type: 'area',
        events: {
          load: function (chart) {
            setTimeout(function () {
              chart.target.reflow();
            }, 0);
          }
        }
      },

      title: {
        text: chartConfiguration.title,
        x: -80
      },

      pane: {
        size: '90%'
      },

      xAxis: {
        categories: categories,
        tickmarkPlacement: 'on',
        lineWidth: 0
      },

      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
      },

      tooltip: {
        shared: true
      },

      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        y: 70,
        layout: 'horizontal'
      },
      series: series

    };
    return piechartObject;
  }

  drawTable(analyticsObject, tableConfiguration) {
    const table = {
      'headers': [],
      'columns': [],
      'rows': [],
      'titles': {
        'rows': [],
        'column': []
      },
      titlesAvailable: false,
      hasParentOu: false
    };
    if (tableConfiguration.hasOwnProperty('title')) {
      table['title'] = tableConfiguration.title;
    }
    if (tableConfiguration.hasOwnProperty('display_list') && tableConfiguration.display_list) {
      table.headers[0] = {
        items: [],
        style: ''
      };
      tableConfiguration.columns[tableConfiguration.columns.indexOf('pe')] = 'eventdate';
      tableConfiguration.columns[tableConfiguration.columns.indexOf('ou')] = 'ouname';
      for (const item of tableConfiguration.columns) {
        table.headers[0].items.push(
          {
            name: analyticsObject.headers[this._getTitleIndex(analyticsObject.headers, item)].column,
            span: 1
          }
        );
      }
      for (const item of analyticsObject.rows) {
        const column_items = [];
        for (const col of tableConfiguration.columns) {
          const index = this._getTitleIndex(analyticsObject.headers, col);
          column_items.push({
            name: '',
            display: true,
            row_span: '1',
            val: item[index]
          });

        }
        table.rows.push(
          {
            headers: [],
            items: column_items
          }
        );
      }
    } else {
      // add names to titles array
      if (tableConfiguration.showDimensionLabels) {
        table.titlesAvailable = true;
        for (const item of tableConfiguration.columns) {
          table.titles.column.push(analyticsObject.headers[this._getTitleIndex(analyticsObject.headers, item)].column);
        }
        for (const item of tableConfiguration.rows) {
          table.titles.rows.push(analyticsObject.headers[this._getTitleIndex(analyticsObject.headers, item)].column);
        }
      }
      for (const columnItem of tableConfiguration.columns) {
        const dimension = this.calculateColSpan(analyticsObject, tableConfiguration.columns, columnItem);
        const currentColumnItems = this.prepareSingleCategories(analyticsObject, columnItem);
        const headerItem = [];
        for (let i = 0; i < dimension.duplication; i++) {
          for (const currentItem of currentColumnItems) {
            headerItem.push({
              'name': currentItem.name,
              'span': dimension.col_span,
              type: currentItem.type,
              id: currentItem.uid
            });
          }
        }
        let styles = '';
        if (tableConfiguration.hasOwnProperty('style')) {
          if (tableConfiguration.styles.hasOwnProperty(columnItem)) {
            styles = tableConfiguration.styles[columnItem];
          }
        }
        table.headers.push({'items': headerItem, 'style': styles});
      }
      for (const rowItem of tableConfiguration.rows) {
        table.columns.push(rowItem);
      }

      // Preparing table columns
      const column_length = tableConfiguration.columns.length;
      const column_items_array = [];
      for (let i = 0; i < column_length; i++) {
        const currentRowItems = this.prepareSingleCategories(analyticsObject, tableConfiguration.columns[i]);
        column_items_array.push(currentRowItems);
      }
      let table_columns_array = [];
      for (let i = 0; i < column_items_array.length; i++) {
        if (table_columns_array.length === 0) {
          for (const item of column_items_array[i]) {
            table_columns_array.push([item]);
          }
        } else {
          const temp_arr = table_columns_array.concat();
          table_columns_array = [];
          for (const item of temp_arr) {
            for (const val of  column_items_array[i]) {
              if (item instanceof Array) {
                const tempArr = Array.from(item);
                table_columns_array.push(tempArr.concat([val]));
              } else {
                table_columns_array.push([item, val]);
              }
            }
          }
        }

      }

      // Preparing table rows
      const rows_length = tableConfiguration.rows.length;
      const row_items_array = [];
      for (let i = 0; i < rows_length; i++) {
        const dimension = this.calculateColSpan(analyticsObject, tableConfiguration.rows, tableConfiguration.rows[i]);
        const currentRowItems = this.prepareSingleCategories(analyticsObject, tableConfiguration.rows[i]);
        row_items_array.push({'items': currentRowItems, 'dimensions': dimension});
      }
      let table_rows_array = [];
      for (let i = 0; i < row_items_array.length; i++) {
        if (table_rows_array.length === 0) {
          for (const item of row_items_array[i].items) {
            item.dimensions = row_items_array[i].dimensions;
            table_rows_array.push([item]);
          }
        } else {
          const temp_arr = table_rows_array.concat();
          table_rows_array = [];
          for (const item of temp_arr) {
            for (const val of  row_items_array[i].items) {
              val.dimensions = row_items_array[i].dimensions;
              if (item instanceof Array) {
                const tempArr = Array.from(item);
                table_rows_array.push(tempArr.concat([val]));
              } else {
                table_rows_array.push([item, val]);
              }
            }
          }
        }

      }

      let counter = 0;
      if (table_rows_array.length !== 0) {
        for (const rowItem of table_rows_array) {
          const item = {
            'items': [],
            'headers': rowItem
          };
          for (const val of rowItem) {
            if (counter === 0 || counter % val.dimensions.col_span === 0) {
              item.items.push({
                'type': val.type,
                'name': val.uid,
                'val': val.name,
                'row_span': val.dimensions.col_span, header: true
              });
            }
          }
          for (const colItem of table_columns_array) {
            const dataItem = [];
            for (const val of rowItem) {
              dataItem.push({'type': val.type, 'value': val.uid});
            }
            for (const val of colItem) {
              dataItem.push({'type': val.type, 'value': val.uid});
            }
            item.items.push({
              'name': '',
              'val': this.getDataValue(analyticsObject, dataItem),
              'row_span': '1',
              'display': true
            });
          }
          if (tableConfiguration.hasOwnProperty('hide_zeros') && tableConfiguration.hide_zeros) {
            if (!this.checkZeros(tableConfiguration.rows.length, item.items)) {
              table.rows.push(item);
            }
          } else {
            table.rows.push(item);
          }

          counter++;
        }
      } else {
        const item = {
          'items': [],
          'headers': []
        };
        for (const colItem of table_columns_array) {
          const dataItem = [];
          for (const val of colItem) {
            dataItem.push({'type': val.type, 'value': val.uid});
          }
          item.items.push({
            'name': '',
            'val': this.getDataValue(analyticsObject, dataItem),
            'row_span': '1',
            'display': true
          });
        }
        if (tableConfiguration.hasOwnProperty('hide_zeros') && tableConfiguration.hide_zeros) {
          if (!this.checkZeros(tableConfiguration.rows.length, item.items)) {
            table.rows.push(item);
          }
        } else {
          table.rows.push(item);
        }
      }
    }
    return table;
  }

  drawAutogrowingTable(analyticsObject, tableConfiguration) {
    const table = {
      'headers': [],
      'columns': [],
      'rows': [],
      'titles': {
        'rows': [],
        'column': []
      }
    };
    if (tableConfiguration.hasOwnProperty('title')) {
      table['title'] = tableConfiguration.title;
    }
    if (tableConfiguration.hasOwnProperty('display_list') && tableConfiguration.display_list) {
      table.headers[0] = {
        items: [],
        style: ''
      };
      tableConfiguration.columns[tableConfiguration.columns.indexOf('pe')] = 'eventdate';
      tableConfiguration.columns[tableConfiguration.columns.indexOf('ou')] = 'ouname';
      for (const item of tableConfiguration.columns) {
        table.headers[0].items.push(
          {
            name: analyticsObject.headers[this._getTitleIndex(analyticsObject.headers, item)].column,
            span: 1
          }
        );
      }
      for (const item of analyticsObject.rows) {
        const column_items = [];
        for (const col of tableConfiguration.columns) {
          const index = this._getTitleIndex(analyticsObject.headers, col);
          column_items.push({
            name: '',
            display: true,
            row_span: '1',
            val: item[index]
          });

        }
        table.rows.push(
          {
            headers: [],
            items: column_items
          }
        );
      }
    } else {
      // add names to titles array
      for (const item of tableConfiguration.columns) {
        table.titles.column.push(analyticsObject.headers[this._getTitleIndex(analyticsObject.headers, item)].column);
      }
      for (const item of tableConfiguration.rows) {
        table.titles.rows.push(analyticsObject.headers[this._getTitleIndex(analyticsObject.headers, item)].column);
      }
      for (const columnItem of tableConfiguration.columns) {
        const dimension = this.calculateColSpan(analyticsObject, tableConfiguration.columns, columnItem);
        const currentColumnItems = this.prepareSingleCategories(analyticsObject, columnItem);
        const headerItem = [];
        for (let i = 0; i < dimension.duplication; i++) {
          for (const currentItem of currentColumnItems) {
            headerItem.push({'name': currentItem.name, 'span': dimension.col_span});
          }
        }
        let styles = '';
        if (tableConfiguration.hasOwnProperty('style')) {
          if (tableConfiguration.styles.hasOwnProperty(columnItem)) {
            styles = tableConfiguration.styles[columnItem];
          }
        }
        table.headers.push({'items': headerItem, 'style': styles});
      }
      for (const rowItem of tableConfiguration.rows) {
        table.columns.push(rowItem);
      }

      // Preparing table columns
      const column_length = tableConfiguration.columns.length;
      const column_items_array = [];
      for (let i = 0; i < column_length; i++) {
        const currentRowItems = this.prepareSingleCategories(analyticsObject, tableConfiguration.columns[i]);
        column_items_array.push(currentRowItems);
      }
      let table_columns_array = [];
      for (let i = 0; i < column_items_array.length; i++) {
        if (table_columns_array.length === 0) {
          for (const item of column_items_array[i]) {
            table_columns_array.push([item]);
          }
        } else {
          const temp_arr = table_columns_array.concat();
          table_columns_array = [];
          for (const item of temp_arr) {
            for (const val of  column_items_array[i]) {
              if (item instanceof Array) {
                const tempArr = Array.from(item);
                table_columns_array.push(tempArr.concat([val]));
              } else {
                table_columns_array.push([item, val]);
              }
            }
          }
        }

      }

      // Preparing table rows
      const rows_length = tableConfiguration.rows.length;
      const row_items_array = [];
      for (let i = 0; i < rows_length; i++) {
        const dimension = this.calculateColSpan(analyticsObject, tableConfiguration.rows, tableConfiguration.rows[i]);
        const currentRowItems = this.prepareSingleCategories(analyticsObject, tableConfiguration.rows[i]);
        row_items_array.push({'items': currentRowItems, 'dimensions': dimension});
      }
      let table_rows_array = [];
      for (let i = 0; i < row_items_array.length; i++) {
        if (table_rows_array.length === 0) {
          for (const item of row_items_array[i].items) {
            item.dimensions = row_items_array[i].dimensions;
            table_rows_array.push([item]);
          }
        } else {
          const temp_arr = table_rows_array.concat();
          table_rows_array = [];
          for (const item of temp_arr) {
            for (const val of  row_items_array[i].items) {
              val.dimensions = row_items_array[i].dimensions;
              if (item instanceof Array) {
                const tempArr = Array.from(item);
                table_rows_array.push(tempArr.concat([val]));
              } else {
                table_rows_array.push([item, val]);
              }
            }
          }
        }

      }

      let counter = 0;
      if (table_rows_array.length !== 0) {
        for (const rowItem of table_rows_array) {
          const item = {
            'items': [],
            'headers': rowItem
          };
          for (const val of rowItem) {
            if (counter === 0 || counter % val.dimensions.col_span === 0) {
              // item.items.push({'name': val.uid, 'val': val.name, 'row_span': val.dimensions.col_span});
            }
          }
          for (const colItem of table_columns_array) {
            const dataItem = [];
            for (const val of rowItem) {
              dataItem.push({'type': val.type, 'value': val.uid});
            }
            for (const val of colItem) {
              dataItem.push({'type': val.type, 'value': val.uid});
            }
            item.items.push({
              'name': '',
              'val': this.getAutoGrowingDataValue(analyticsObject, dataItem),
              'row_span': '1',
              'display': true
            });
          }
          if (tableConfiguration.hasOwnProperty('hide_zeros') && tableConfiguration.hide_zeros) {
            if (!this.checkZeros(tableConfiguration.rows.length, item.items)) {
              table.rows.push(item);
            }
          } else {
            table.rows.push(item);
          }

          counter++;
        }
      } else {
        const item = {
          'items': [],
          'headers': []
        };
        for (const colItem of table_columns_array) {
          const dataItem = [];
          for (const val of colItem) {
            dataItem.push({'type': val.type, 'value': val.uid});
          }
          item.items.push({
            'name': '',
            'val': this.getAutoGrowingDataValue(analyticsObject, dataItem),
            'row_span': '1',
            'display': true
          });
        }
        if (tableConfiguration.hasOwnProperty('hide_zeros') && tableConfiguration.hide_zeros) {
          if (!this.checkZeros(tableConfiguration.rows.length, item.items)) {
            table.rows.push(item);
          }
        } else {
          table.rows.push(item);
        }
      }
    }
    return table;
  }

  checkZeros(stating_length, array): boolean {
    let checker = true;
    for (let i = stating_length; i < array.length; i++) {
      if (array[i].name === '' && array[i].val !== null) {
        checker = false;
      }
    }
    return checker;
  }

  calculateColSpan(analyticsObject, array, item) {
    const indexOfItem = array.indexOf(item);
    const array_length = array.length;
    const last_index = array_length - 1;
    const dimensions = {'col_span': 1, 'duplication': 1};
    for (let i = last_index; i > indexOfItem; i--) {
      const arr = this.prepareSingleCategories(analyticsObject, array[i]);
      dimensions.col_span = dimensions.col_span * arr.length;
    }
    for (let i = 0; i < indexOfItem; i++) {
      const arr = this.prepareSingleCategories(analyticsObject, array[i]);
      dimensions.duplication = dimensions.duplication * arr.length;
    }
    return dimensions;

  }

  getChartConfigurationObject(type, show_labels: boolean = false): any {
    if (type === 'defaultChartObject') {
      return {
        title: {
          text: ''
        },
        chart: {
          events: {
            load: function (chart) {
              setTimeout(function () {
                chart.target.reflow();
              }, 0);
            }
          },
          type: ''
        },
        xAxis: {
          categories: [],
          labels: {
            rotation: -45,
            style: {'color': '#000000', 'fontWeight': 'normal'}
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }, labels: {
            style: {'color': '#000000', 'fontWeight': 'bold'}
          }
        },
        labels: {
          items: [{
            html: '',
            style: {
              left: '50px',
              top: '18px'
              // color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
          }]
        },
        plotOptions: {},
        series: []
      };
    } else if (type === 'stackedChartObject') {
      return {
        chart: {
          type: 'column',
          events: {
            load: function (chart) {
              setTimeout(function () {
                chart.target.reflow();
              }, 0);
            }
          }
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          },
          stackLabels: {
            enabled: show_labels,
            style: {
              fontWeight: 'bold'
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: false
            }
          }
        },
        series: []
      };
    } else if (type === 'barStackedObject') {
      return {
        chart: {
          type: 'bar',
          events: {
            load: function (chart) {
              setTimeout(function () {
                chart.target.reflow();
              }, 0);
            }
          }
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          },
          stackLabels: {
            enabled: show_labels,
            style: {
              fontWeight: 'bold'
            }
          }
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            dataLabels: {
              enabled: false
            }
          }
        },
        series: []
      };
    } else if (type === 'gaugeObject') {
      return {
        chart: {
          type: 'solidgauge',
          events: {
            load: function (chart) {
              setTimeout(function () {
                chart.target.reflow();
              }, 0);
            }
          }
        },

        title: {
          text: ''
        },

        pane: {
          center: ['50%', '85%'],
          size: '140%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },

        tooltip: {
          enabled: false
        },

        // the value axis
        yAxis: {
          stops: [
            [0.1, '#DF5353'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#55BF3B'] // red
          ],
          lineWidth: 0,
          minorTickInterval: null,
          tickPixelInterval: 400,
          tickWidth: 0,
          labels: {
            y: 16
          },
          min: 0,
          max: 100,
          title: {
            text: ''
          }
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true
            }
          }
        },
        credits: {
          enabled: false
        },
        series: []
      };
    } else if (type === 'pieChart') {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            borderWidth: 0,
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: 'black'
              }
            }
          }
        },
        series: []
      };
    }
  }


  /**
   * MAP VISUALIZATION  FUNCTIONS
   * */
  drawMap(analytics, geoFeatures) {
    const defaultMapSettings = this._getDefaultMapSettings(geoFeatures);
    const mapMapVisualization = this._prepareMapVisualization(analytics, defaultMapSettings);
    return mapMapVisualization;
  }

  private _prepareMapVisualization(analytics, defaultMapSettings) {
    const headers = analytics.headers;
    const dx = analytics.metaData.dx;
    const pe = analytics.metaData.pe;
    const ou = analytics.metaData.ou;
    const names = analytics.metaData.names;
    const rows = analytics.rows;
    const layers = this._prepareLayers(headers, names, dx, pe, rows, defaultMapSettings);

    return {
      id: defaultMapSettings.id + dx[0],
      name: names[dx[0]] + ' ' + names[pe[0]],
      center: [0, 0],
      zoom: 8,
      maxZoom: 18,
      minZoom: 2,
      zoomControl: true,
      scrollWheelZoom: false,
      layers: layers.interfaceLayers,
      legendInterface: layers.backendLayers
    }
  }

  private _getMapLabels(L, features) {
    const markerLabels = [];
    const sanitizeColor = (color: any) => {

      if (color && color.indexOf('#') > -1) {
        const colors = color.split('#');
        color = '#' + colors[colors.length - 1];
      }
      return color;
    }
    features.forEach((feature, index) => {
      let center: any;
      if (feature.geometry.type === 'Point') {
        center = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
      } else {
        const polygon = L.polygon(feature.geometry.coordinates);
        center = polygon.getBounds().getCenter();
      }

      const label = L.marker([center.lng, center.lat], {
        icon: L.divIcon({
          iconSize: new L.Point(50, 50),
          className: 'feature-label',
          html: feature.properties.name + '  (' + feature.properties['dataElement.value'] + ')'
        })
      })

      markerLabels.push(label);

    });

    return L.layerGroup(markerLabels);
  }

  private _modalLayers(names, dx, pe, rows, dxIndex, ouIndex, valueIndex) {
    let layers = [];
    dx.map(dataDimension => {
      pe.map(periodDimension => {
        const layer = {
          id: dataDimension + '' + periodDimension,
          name: names[dataDimension] + ' ' + names[periodDimension],
          subtitle: names[periodDimension],
          displayName: this._prepareDisplayName(names[dataDimension] + ' ' + names[periodDimension]),
          hide: true,
          data: [],
          legend: []
        }
        rows.map((row) => {
          if (row[dxIndex] === dataDimension) {
            layer.data.push({
              ou: row[ouIndex],
              value: row[valueIndex]
            });
          }
        });
        layers.push(layer);
      });
    });
    layers[0].hide = false;
    return layers;
  }

  private _prepareLayers(headers, names, dx, pe, rows, defaultMapSettings) {
    const interfaceLayers = [];
    const backendLayers = [];
    const dxIndex = _.findIndex(headers, ['name', 'dx']);
    const valueIndex = _.findIndex(headers, ['name', 'value']);
    const ouIndex = _.findIndex(headers, ['name', 'ou']);

    interfaceLayers.push(
      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy;<a href="https://carto.com/attribution">cartoDB</a>'
      })
    )

    const modalLayers: Array<any> = this._modalLayers(names, dx, pe, rows, dxIndex, ouIndex, valueIndex);
    const geofeatures = this._prepareGeoJSONArray(defaultMapSettings.geoFeatures);
    modalLayers.map(layer => {
      layer.legend = this._prepareLayerLegends(layer.data, defaultMapSettings);
      const options = {
        click: (event) => {
        },
        onEachFeature: (feature) => {
        },
        mouseover: (event) => {
          const hoveredFeature: any = event.layer.feature;
          const properties = hoveredFeature.properties;
          let toolTipContent: string = '<div style="color:#333!important;font-size: 10px">' +
            '<table>';
          toolTipContent += '<tr><td style="color:#333!important;font-weight:bold;" > ' + properties.name + ' </td></tr>';
          toolTipContent += '</table></div>';

          geoJsonLayer.bindTooltip(toolTipContent, {
            direction: 'auto',
            permanent: false,
            sticky: true,
            interactive: true,
            opacity: 1
          });

          geoJsonLayer.setStyle((feature: GeoJSON.Feature<GeoJSON.GeometryObject>) => {
            const properties: any = feature.properties;
            const featureStyle: any =
              {
                'stroke': true,
                'weight': 1
              }
            if (hoveredFeature.properties.id === properties.id) {
              featureStyle.weight = 3;
            }


            return featureStyle;
          });
        },
        mouseout: (event) => {

          const hoveredFeature: any = event.layer.feature;
          geoJsonLayer.setStyle((feature: GeoJSON.Feature<GeoJSON.GeometryObject>) => {
            const properties: any = feature.properties;
            const featureStyle: any =
              {
                'stroke': true,
                'weight': 1
              }
            const hov: any = hoveredFeature.properties;
            if (hov.id === properties.id) {
              featureStyle.weight = 1;
            }
            return featureStyle;
          });
        },
        style: (feature) => {
          const {properties} = feature;
          return {
            'color': properties.stroke,
            'fillColor': this.getColor(feature, layer),
            'fillOpacity': properties['fill-opacity'],
            'weight': 1,
            'opacity': 0.8,
            'stroke': true
          }
        }

      }
      const geoJsonLayer: any = L.geoJSON(this._refineLayerFeatures(geofeatures, layer), options);
      interfaceLayers.push(geoJsonLayer);
      backendLayers.push(layer);
    });
    interfaceLayers.push(this._getMapLabels(L, geofeatures));
    return {interfaceLayers, backendLayers};
  }

  private _refineLayerFeatures(geofeatures, layer) {
    const geos = [];
    geofeatures.map((feature) => {
      const dataValue: any = _.find(layer.data, ['ou', feature.properties.id]);
      feature.properties['dataElement.value'] = dataValue ? dataValue.value : 0;
      geos.push(feature);
    })
    return geos;
  }

  private _prepareDisplayName(name) {
    let limit: number = 25;
    return name.length > limit ? name.substr(0, limit) + '...' : name;
  }

  private getColor(feature, layer) {
    let color = '#cccccc';
    const legend = layer.legend;
    const data = layer.data;
    const featureScore: any = _.find(data, ['ou', feature.properties.id]);
    if (featureScore) {
      const value = (new Function('return ' + featureScore.value))();
      legend.forEach(legendItem => {
        if (legendItem.min <= value && legendItem.max > value) {
          color = legendItem.color;
        }

        if (legendItem.max <= value) {
          color = legendItem.color;
        }
      });
    }

    return color;
  }

  private _prepareLayerLegends(data, defaultMapSettings) {
    let legendSetColorArray: any = null;

    legendSetColorArray = this.colorInterpolation.getColorScaleFromHigLow(defaultMapSettings);


    let dataArray: any[] = [], legend: any = [];
    const classLimits = [], classRanges = [];
    let doneWorkAround = false;

    if (data) {
      const sortedData = this._getDataSortedArray(data);
      dataArray = sortedData;

      const interval = +((defaultMapSettings.radiusHigh - defaultMapSettings.radiusLow) / defaultMapSettings.classes).toFixed(0);
      const radiusArray = [];
      for (let classNumber = 0; classNumber < defaultMapSettings.classes; classNumber++) {
        if (classNumber === 0) {
          radiusArray.push(defaultMapSettings.radiusLow);
        } else {
          radiusArray.push(radiusArray[classNumber - 1] + interval);
        }
      }

      // Workaround for classess more than values
      if (sortedData.length < defaultMapSettings.classes) {
        if (sortedData.length === 0 && doneWorkAround === false) {
          sortedData.push(0);
          doneWorkAround = true;
        }
        if (sortedData.length === 1 && doneWorkAround === false) {
          sortedData.push(sortedData[0] + 1);
          doneWorkAround = true;
        }
      }

      for (let classIncr = 0; classIncr <= defaultMapSettings.classes; classIncr++) {
        if (defaultMapSettings.method === 3) { // equal counts
          const index = classIncr / defaultMapSettings.classes * (sortedData.length - 1);
          if (Math.floor(index) === index) {
            classLimits.push(sortedData[index]);
          } else {
            const approxIndex = Math.floor(index);
            classLimits.push(sortedData[approxIndex] + (sortedData[approxIndex + 1] - sortedData[approxIndex]) * (index - approxIndex));
          }
        } else {
          classLimits.push(Math.min.apply(Math, sortedData) + ( (Math.max.apply(Math, sortedData) - Math.min.apply(Math, sortedData)) / defaultMapSettings.classes ) * classIncr);
        }
      }


      if (doneWorkAround) {
        dataArray.pop()
      }
      // Offset Workaround
      // Populate data count into classes
      classLimits.forEach(function (classLimit, classIndex) {
        if (classIndex < classLimits.length - 1) {
          const min = classLimits[classIndex], max = classLimits[classIndex + 1];
          legend.push({
            name: '',
            label: '',
            description: '',
            relativeFrequency: '',
            min: +min.toFixed(1),
            max: +max.toFixed(1),
            color: legendSetColorArray[classIndex],
            count: 0,
            radius: 0,
            boundary: false
          });
        }
      });

    }
    legend = this._getLegendCounts(dataArray, legend);
    return legend;
  }

  private _getLegendCounts(dataArray, legend) {
    let totalCounts = 0;
    dataArray.forEach(data => {
      legend.forEach((legendItem, legendIndex) => {
        if (legendItem.min <= data && data < legendItem.max) {
          legendItem.count += 1;
          totalCounts += 1;
        }

        if (legendIndex === legend.length - 1 && legendItem.min < data && data === legendItem.max) {
          legendItem.count += 1;
          totalCounts += 1;
        }
      });
    });

    legend.forEach(leg => {
      const fraction = (leg.count / totalCounts);
      leg.percentage = fraction ? (fraction * 100).toFixed(0) + '%' : '';
    })

    return legend;
  }

  private _getDataSortedArray(data) {
    const dataArray = [];
    let sortedData = [];
    if (data) {
      data.map(dataItem => {
        dataArray.push((new Function('return ' + dataItem.value))());
      })
      sortedData = _(dataArray).sortBy().value();
    }
    return sortedData;
  }

  private _prepareGeoJSONArray(geoFeatures) {
    const features = [];

    geoFeatures.map((feature) => {
      features.push(
        {
          'type': 'Feature',
          'le': feature.le,
          'geometry': {
            'type': feature.le >= 4 ? 'Point' : 'MultiPolygon',
            'coordinates': (new Function('return ' + feature.co))()
          },
          'properties': {
            'id': feature.id,
            'name': feature.na,
            'dataElement.id': '',
            'dataElement.name': '',
            'dataElement.value': 0,
            'classInterval': '',
            'fill': '',
            'fill-opacity': 1,
            'stroke': '#000000',
            'stroke-opacity': 1,
            'stroke-width': 1
          }
        }
      );
    })
    return features;
  }

  private _getDefaultMapSettings(geoFeatures) {
    const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const index = Math.floor((Math.random() * (text.length - 11)) + 0);
    return {
      id: text.substr(index, 11),
      method: 3,
      labels: false,
      labelFontColor: '#000000',
      layer: 'thematic1',
      labelFontStyle: 'normal',
      radiusHigh: 15,
      hideTitle: false,
      eventClustering: false,
      colorLow: '#ff0000',
      colorHigh: '#007F00',
      opacity: 0.8,
      parentLevel: 0,
      parentGraphMap: {
        ImspTQPwCqd: ''
      },
      labelFontSize: '11px',
      completedOnly: false,
      eventPointRadius: 0,
      hidden: false,
      classes: 5,
      hideSubtitle: false,
      labelFontWeight: 'normal',
      radiusLow: 5,
      geoFeatures: geoFeatures
    }
  }

  prepareCSVData(analytics) {

    if (analytics === null) {
      return null;
    }

    let result, ctr, keys, columnDelimiter, lineDelimiter;
    let uids = [];
    if (analytics.hasOwnProperty('headers')) {

      const orgIndex = _.findIndex(analytics.headers, ['name', 'ou']);
      const valueIndex = _.findIndex(analytics.headers, ['name', 'value']);

      columnDelimiter = ',';
      lineDelimiter = '\n';
      keys = ['Organisation Unit'];
      analytics.metaData.dx.forEach((dataElement, dataElementIndex) => {

        keys.push(analytics.metaData.names[dataElement]);
        uids.push(dataElement);

      });

      result = '';
      result += keys.join(columnDelimiter);
      result += lineDelimiter;
      console.log(analytics);
      analytics.metaData.dx.forEach((dataElement, dataElementIndex) => {

        analytics.rows.forEach((item) => {
          ctr = 0;
          uids.forEach((key, keyIndex) => {
            result += analytics.metaData.names[item[orgIndex]];
            result += columnDelimiter;
            result += item[valueIndex];
            result += lineDelimiter = '\n';
            ctr++;
          });
        });

      });


    } else {
      return '';
    }

    return result;
  }

  /**
   * END OF MAP VISUALIZATION  FUNCTIONS
   * */


}
