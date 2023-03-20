import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EjemploService } from 'app/services/ejemplo.service';
import swal from 'sweetalert2';
declare var require: any;
var highcharts = require('highcharts');
require('highcharts/modules/exporting')(highcharts);
require('highcharts/modules/drag-panes')(highcharts);
require('highcharts/modules/pareto')(highcharts);
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-metricas1',
  templateUrl: './metricas1.component.html',
  styleUrls: ['./metricas1.component.css']
})


export class Metricas1Component implements OnInit {

  public series: any;

  public KPIs: any;
  public pareto: any;
  public tituloPareto: any;

  public mostrarPareto: any = false;

  public fechaDesde: any;
  public fechaHasta: any;

  public botonSeleccion: any;
  public tiemposSeleccion: any[] =
    [{ "tiempo": "2hr", "prendido": false }, { "tiempo": "4hr", "prendido": false }, { "tiempo": "8hr", "prendido": false }, { "tiempo": "1d", "prendido": false },
    { "tiempo": "1wk", "prendido": false }, { "tiempo": "4wk", "prendido": false }, { "tiempo": "1yr", "prendido": false },
    { "tiempo": "MTC", "prendido": false }, { "tiempo": "YTD", "prendido": false }]

  constructor(private _service: EjemploService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    var MyDate = new Date();
    var MyDateString;
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-01';
    this.fechaDesde = MyDateString;
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (MyDate.getDate())).slice(-2) + "T" + ('0' + (MyDate.getHours())).slice(-2) + ":" + ('0' + (MyDate.getMinutes())).slice(-2) + ":" + ('0' + (MyDate.getSeconds())).slice(-2);
    this.fechaHasta = MyDateString;

    this.fechaDesde = "2023-01-01T00:00:00";
    this.fechaHasta = "2023-01-18T00:00:00";


    this.selectorFechas(999);
  }

  llamarGrafico() {
    this._service.obtenerSeries("H9", this.fechaDesde, this.fechaHasta).subscribe(
      result => {
        this.series = result;
        this.waterfallChart();
      },
      error => {
        console.log(error);
      });
  }

  waterfallChart() {
    highcharts.chart('container1', {

      chart: {
        type: 'bar'
      },
      title: {
        text: 'Métricas'
      },
      xAxis: {
        categories: ['', '', '', '', '', '']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Minutos'
        }
      },
      legend: {
        reversed: true,
        enabled: false
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          point: {
            events: {
              click: function (e) {
                this.verPareto(e.point.series.name);
              }.bind(this)
            }
          },
          dataLabels: [{
            enabled: true,
            format: '{point.y}',
            align: 'center',
            inside: true
          },
          {
            enabled: true,
            align: 'left',
            x: 0,
            y: -20,
            format: '{series.name}',
            style: {
              color: 'black'
            }
          },
          ]
        }
      },
      series: this.series
    });
  }

  selectorFechas(i: any) {
    this.tiemposSeleccion.forEach(element => {
      element.prendido = false;
    });

    if (i == 999) {
      this.llamarGrafico();
      this.obtenerKPI();
      this.obtenerPareto();
      return;
    }

    this.tiemposSeleccion[i].prendido = true;



    var MyDate = new Date();
    if (i == 0) {
      MyDate = this.subtractHours(MyDate, 2);
    }
    else if (i == 1) {
      MyDate = this.subtractHours(MyDate, 4);
    }
    else if (i == 2) {
      MyDate = this.subtractHours(MyDate, 8);
    }
    else if (i == 3) {
      MyDate = this.subtractHours(MyDate, 24);
    }
    else if (i == 4) {
      MyDate = this.subtractHours(MyDate, 168);
    }
    else if (i == 5) {
      MyDate = this.subtractHours(MyDate, 672);
    }
    else if (i == 6) {
      MyDate = this.subtractHours(MyDate, 8760);
    }
    else if (i == 7) {
      MyDate = this.subtractHours(MyDate, 672); // falta determinar los dias del mes
    }
    else if (i == 8) {
      MyDate = this.subtractHours(MyDate, 8760); // falta determinar los dias del año
    }
    var MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (MyDate.getDate())).slice(-2) + "T" + ('0' + (MyDate.getHours())).slice(-2) + ":" + ('0' + (MyDate.getMinutes())).slice(-2) + ":" + ('0' + (MyDate.getSeconds())).slice(-2);
    this.fechaDesde = MyDateString;
    MyDate = new Date();
    var MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (MyDate.getDate())).slice(-2) + "T" + ('0' + (MyDate.getHours())).slice(-2) + ":" + ('0' + (MyDate.getMinutes())).slice(-2) + ":" + ('0' + (MyDate.getSeconds())).slice(-2);
    this.fechaHasta = MyDateString;
    console.log(this.fechaDesde);
    this.llamarGrafico();
    this.obtenerKPI();
  }

  subtractHours(date, hours) {
    date.setHours(date.getHours() - hours);
    return date;
  }

  obtenerKPI() {
    this._service.obtenerKPI("H9", this.fechaDesde, this.fechaHasta).subscribe(
      result => {
        this.KPIs = result;
        console.log(result);
      },
      error => {
        console.log(error);
      });
  }

  obtenerPareto() {
    this._service.obtenerPareto("H9", this.fechaDesde, this.fechaHasta).subscribe(
      result => {
        this.pareto = result;
        this.graficoPareto();
      },
      error => {
        console.log(error);
      });
  }

  graficoPareto() {

    let categories = [];
    let data = [];
    this.pareto.forEach(par => {
      categories.push(par.comentario);
      data.push(par.minutos);
    });

    highcharts.chart('container2', {
      chart: {
        renderTo: 'container2',
        type: 'column'
      },
      title: {
        text: this.tituloPareto
      },
      tooltip: {
        shared: true
      },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      yAxis: [{
        title: {
          text: ''
        }
      }, {
        title: {
          text: ''
        },
        minPadding: 0,
        maxPadding: 0,
        max: 100,
        min: 0,
        opposite: true,
        labels: {
          format: '{value}%'
        }
      }],
      series: [{
        type: 'pareto',
        name: 'Pareto',
        yAxis: 1,
        zIndex: 10,
        baseSeries: 1,
        tooltip: {
          valueDecimals: 2,
          valueSuffix: '%'
        }
      }, {
        name: 'Minutos',
        type: 'column',
        zIndex: 2,
        data: data
      }]
    });
  }

  sanitizeStyleWidth(valor: any) {
    return this.sanitizer.bypassSecurityTrustStyle("width:" + valor + "%;");
  }

  verPareto(nombreSerie: any) {
    if (nombreSerie == null) {
      this.mostrarPareto = false;
    }
    else {
      this.mostrarPareto = true;
      this.tituloPareto = nombreSerie;
      this.obtenerPareto();
    }
  }
}
