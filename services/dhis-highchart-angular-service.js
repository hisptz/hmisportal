(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('dhisHighchartAngularService.config', [])
      .value('dhisHighchartAngularService.config', {
          debug: true
      });

  // Modules
  angular.module('dhisHighchartAngularService.directives', []);
  angular.module('dhisHighchartAngularService.filters', []);
  angular.module('dhisHighchartAngularService.services', ['chartServices']);
  angular.module('dhisHighchartAngularService',
      [
          'dhisHighchartAngularService.config',
          'dhisHighchartAngularService.directives',
          'dhisHighchartAngularService.filters',
          'dhisHighchartAngularService.services'
      ]);

})(angular);

/**
 * Created by kelvin on 1/9/16.
 */
/*jslint maxlen: 130 */
var chartServices = angular.module('chartServices',['ngResource']);

chartServices.factory('chartsManager',function(){
  'use strict';

  var chartsManager = {
    data: '',
    defaultChartObject: {
      title: {
        text: ''
      },
      xAxis: {
        categories: [],
        labels:{
          rotation: -90,
          style:{ 'color': '#000000', 'fontWeight': 'normal' }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },labels:{
          style:{ 'color': '#000000', 'fontWeight': 'bold' }
        }
      },
      labels: {
        items: [{
          html: '',
          style: {
            left: '50px',
            top: '18px'
            //color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
          }
        }]
      },
      series: []
    },
    //determine the position of metadata using prefix [dx,de,co,pe,ou]
    getTitleIndex: function(analyticsObjectHeaders,name){
      var index = 0;
      var counter = 0;
      angular.forEach(analyticsObjectHeaders,function(header){
        if(header.name === name){
          index = counter;
        }
        counter++;
      });
      return index;
    },

    //determine the position of data value,(Expected to be the last one)
    getValueIndex: function(analyticsObjectHeaders){
      var counter = -1;
      angular.forEach(analyticsObjectHeaders,function(header){
        counter++;
      });
      return counter;
    },

    //get an array of items from analyticsObject[metadataType == dx,co,ou,pe,value]
    getMetadataArray : function (analyticsObject,metadataType) {
      //determine the position of metadata in rows of values
      var index = this.getTitleIndex(analyticsObject.headers,metadataType);
      var metadataArray = [];
      var checkArr = [];
      if(metadataType === 'dx'){
        metadataArray = analyticsObject.metaData.dx;
      }else if(metadataType === 'ou'){
        metadataArray = analyticsObject.metaData.ou;
      }else if(metadataType === 'co'){
        metadataArray = analyticsObject.metaData.co;
      }else if(metadataType === 'pe'){
        metadataArray = analyticsObject.metaData.pe;
      }else{
        metadataArray = analyticsObject.metaData[metadataType];
      }

      return metadataArray;
    },

    //preparing categories depending on selections
    //return the meaningfull array of xAxis and yAxis Items
    //x axisItems and yAxisItems are specified if you want few data type array['uid1','uid2']
    prepareCategories : function(analyticsObject,xAxis,xAxisItems,yAxis,yAxisItems){
      var structure = {'xAxisItems':[],'yAxisItems':[]};
      if(xAxisItems.length === 0){
        angular.forEach(this.getMetadataArray(analyticsObject,xAxis),function(val){
          structure.xAxisItems.push({'name':analyticsObject.metaData.names[val],'uid':val});
        });
      }if(xAxisItems.length !== 0){
        angular.forEach(xAxisItems,function(val){
          structure.xAxisItems.push({'name':analyticsObject.metaData.names[val],'uid':val});
        });
      }if(yAxisItems.length !== 0){
        angular.forEach(yAxisItems,function(val){
          structure.yAxisItems.push({'name':analyticsObject.metaData.names[val],'uid':val});
        });
      }if(yAxisItems.length === 0){
        angular.forEach(this.getMetadataArray(analyticsObject,yAxis),function(val){
          structure.yAxisItems.push({'name':analyticsObject.metaData.names[val],'uid':val});
        });

      }

      return structure;

    },

    //preparing categories depending on selections
    //return the meaningfull array of single selection only
    //items are specified if you want few data type array['uid1','uid2']
    prepareSingleCategories : function(analyticsObject,xAxis,xAxisItems){
      var structure = [];
      if(xAxisItems.length === 0){
        angular.forEach(this.getMetadataArray(analyticsObject,xAxis),function(val){
          structure.push({'name':analyticsObject.metaData.names[val],'uid':val});
        });
      }if(xAxisItems.length !== 0){
        angular.forEach(xAxisItems,function(val){
          structure.push({'name':analyticsObject.metaData.names[val],'uid':val});
        });
      }
      return structure;

    },

    //try to find data from the rows of analytics object
    getDataValue : function(analyticsObject,xAxisType,xAxisUid,yAxisType,yAxisUid,filterType,filterUid){
      var num = 0;
      var currentService = this;
      $.each(analyticsObject.rows,function(key,value){
        if(filterType === 'none'){
          if(value[currentService.getTitleIndex(analyticsObject.headers,yAxisType)] === yAxisUid &&
            value[currentService.getTitleIndex(analyticsObject.headers,xAxisType)] === xAxisUid ){
            num = parseFloat(value[currentService.getTitleIndex(analyticsObject.headers,'value')]);
          }
        }else{

          if(value[currentService.getTitleIndex(analyticsObject.headers,yAxisType)] === yAxisUid &&
            value[currentService.getTitleIndex(analyticsObject.headers,xAxisType)] === xAxisUid &&
            value[currentService.getTitleIndex(analyticsObject.headers,filterType)] === filterUid ){
            num = parseFloat(value[currentService.getTitleIndex(analyticsObject.headers,'value')]);
          }
        }

      });
      return num;
    },

    //drawing some charts
    drawChart : function(analyticsObject,xAxisType,xAxisItems,yAxisType,yAxisItems,filterType,filterUid,title,type) {
      var currentService = this;
      switch (type){
        case 'bar':
          return currentService.drawOtherCharts(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title, type);
          break;
        case 'column':
          return currentService.drawColumnChart(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title, 'bar');
          break;
        case 'combined':
          return currentService.drawCombinedChart(analyticsObject,  xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title);
          break;
        case 'line':
          return currentService.drawOtherCharts(analyticsObject,  xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title, type);
          break;
        case 'pie':
          return currentService.drawPieChart(analyticsObject,  xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title);
          break;
        case 'table':
          return currentService.drawTable(analyticsObject,  xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title);
          break;
        case 'area':
          return currentService.drawOtherCharts(analyticsObject,  xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title, type);
          break;
        case 'spider':
          return currentService.drawSpiderChart(analyticsObject,  xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title, type);
          break;
        default :
          return currentService.drawTable(analyticsObject,  xAxisType,xAxisItems,yAxisType,yAxisItems, filterType, filterUid, title);
          break;
      }
    },

      drawTable : function(analyticsObject, yAxisType,yAxisItems,xAxisType,xAxisItems,filterType,filterUid,title){
        var chartService = this;
        var table="<thead><tr><th></th>";
        angular.forEach(chartService.prepareSingleCategories(analyticsObject,xAxisType,xAxisItems),function(column){
          table+="<th>"+column.name+"</th>";
        });
        table+="</tr></thead><tbody>";
        angular.forEach(chartService.prepareSingleCategories(analyticsObject,yAxisType,yAxisItems),function(row){
          table+="<tr><td>"+row.name+"</td>";
          angular.forEach(chartService.prepareSingleCategories(analyticsObject,xAxisType,xAxisItems),function(column){
            table+="<td>"+chartService.getDataValue(analyticsObject,xAxisType,column.uid,yAxisType,row.uid,filterType,filterUid)+"</td>";
          });
          table+="</tr>";
        })
        table+="</tbody>";
        return table;

      },
    //hacks for pie chart
    drawPieChart : function(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems,filterType,filterUid,title){

      var chartObject = angular.copy(this.defaultChartObject);
      chartObject.title.text = title;

      //chartObject.yAxis.title.text = title.toLowerCase();
      var pieSeries = [];
      var metaDataObject = this.prepareCategories(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems);
      var currentService = this;
      var serie = [];
      angular.forEach(metaDataObject.yAxisItems,function(yAxis){
        angular.forEach(metaDataObject.xAxisItems,function(xAxis){
          var number = currentService.getDataValue(analyticsObject,xAxisType,xAxis.uid,yAxisType,yAxis.uid,filterType,filterUid);
          serie.push({name: xAxis.name , y: parseFloat(number)});
        });
      });
      chartObject.series.push({type: 'pie', name:title , data: serie,showInLegend: true,
        dataLabels: {
          enabled: false
        } });
      return chartObject;
    },

    //hack for combined charts
    drawCombinedChart : function(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems,filterType,filterUid,title){
      var chartObject = angular.copy(this.defaultChartObject);
      chartObject.title.text = title;
      //chartObject.yAxis.title.text = title.toLowerCase();
      var pieSeries = [];
      var metaDataObject = this.prepareCategories(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems);
      var currentService = this;
      //set x-axis categories
      angular.forEach(metaDataObject.xAxisItems, function (val) {
        chartObject.xAxis.categories.push(val.name);
      });
      angular.forEach(metaDataObject.yAxisItems,function(yAxis){
        var barSeries = [];
        angular.forEach(metaDataObject.xAxisItems,function(xAxis){
          var number = currentService.getDataValue(analyticsObject,xAxisType,xAxis.uid,yAxisType,yAxis.uid,filterType,filterUid);
          barSeries.push(parseFloat(number));
          pieSeries.push({name: yAxis.name+' - '+ xAxis.name , y: parseFloat(number) });
        });
        chartObject.series.push({type: 'column', name: yAxis.name, data: barSeries});
        chartObject.series.push({type: 'spline', name: yAxis.name, data: barSeries});
      });
      //chartObject.series.push({type: 'pie', name: title, data: pieSeries,center: [100, 80],size: 150,showInLegend: false,
      //  dataLabels: {
      //    enabled: false
      //  }
      //});

      return chartObject;
    },

    //draw all other types of chart[bar,line,area]
    drawOtherCharts : function(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems,filterType,filterUid,title,chartType){

      var chartObject = angular.copy(this.defaultChartObject);
      chartObject.title.text = title;
      var metaDataObject = this.prepareCategories(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems);
      var currentService = this;
      angular.forEach(metaDataObject.xAxisItems, function (val) {
        chartObject.xAxis.categories.push(val.name);
      });
      angular.forEach(metaDataObject.yAxisItems,function(yAxis){
        var chartSeries = [];
        angular.forEach(metaDataObject.xAxisItems,function(xAxis){
          var number = currentService.getDataValue(analyticsObject,xAxisType,xAxis.uid,yAxisType,yAxis.uid,filterType,filterUid);
          //console.log(xAxis.name+"("+xAxis.uid+")"+"---"+yAxis.name+"("+yAxis.uid+")"+" value is " + number);
          chartSeries.push(parseFloat(number));
        });
        chartObject.series.push({type: chartType, name: yAxis.name, data: chartSeries});
      });
      return chartObject;
    },
    //draw all other types of chart[bar,line,area]
    drawColumnChart : function(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems,filterType,filterUid,title,chartType){

      var chartObject = angular.copy(this.defaultChartObject);
      chartObject.title.text = title;
      chartObject.xAxis.labels.rotation = 0;
      var metaDataObject = this.prepareCategories(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems);
      var currentService = this;
      angular.forEach(metaDataObject.xAxisItems, function (val) {
        chartObject.xAxis.categories.push(val.name);
      });
      angular.forEach(metaDataObject.yAxisItems,function(yAxis){
        var chartSeries = [];
        angular.forEach(metaDataObject.xAxisItems,function(xAxis){
          var number = currentService.getDataValue(analyticsObject,xAxisType,xAxis.uid,yAxisType,yAxis.uid,filterType,filterUid);
          //console.log(xAxis.name+"("+xAxis.uid+")"+"---"+yAxis.name+"("+yAxis.uid+")"+" value is " + number);
          chartSeries.push(parseFloat(number));
        });
        chartObject.series.push({type: chartType, name: yAxis.name, data: chartSeries});
      });
      return chartObject;
    },

    drawSpiderChart : function(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems,filterType,filterUid,title,chartType){
      var metaDataObject = this.prepareCategories(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems);
      var currentService = this;
      var categories = [];
      angular.forEach(metaDataObject.xAxisItems, function (val) {
        categories.push(val.name);
      });

      var series = [];
      angular.forEach(metaDataObject.yAxisItems,function(yAxis){
        var chartSeries = [];
        angular.forEach(metaDataObject.xAxisItems,function(xAxis){
          var number = currentService.getDataValue(analyticsObject,xAxisType,xAxis.uid,yAxisType,yAxis.uid,filterType,filterUid);
          //console.log(xAxis.name+"("+xAxis.uid+")"+"---"+yAxis.name+"("+yAxis.uid+")"+" value is " + number);
          chartSeries.push(parseFloat(number));
        });
        series.push({name: yAxis.name, data: chartSeries, pointPlacement: 'on'});
      });
      var chartObject = {

        chart: {
          polar: true,
              type: 'line'
        },

        title: {
          text: title,
              x: -80
        },

        pane: {
          size: '80%'
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
      return chartObject;
    }
  };
  return chartsManager;
});
