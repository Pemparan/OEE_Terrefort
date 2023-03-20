import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { datos } from '../../models/ejemplo.model';
import { EjemploService } from 'app/services/ejemplo.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-tabla-eventos',
  templateUrl: './tabla-eventos.component.html',
  styleUrls: ['./tabla-eventos.component.css']
})

export class TablaEventosComponent implements OnInit {

  public fechaDesde: any;
  public fechaHasta: any;

  public razones:any;
  public datos: any;


  constructor(private _service: EjemploService) { }

  ngOnInit() {
    var MyDate = new Date();
    var MyDateString;
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-01';
    this.fechaDesde = MyDateString;
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (MyDate.getDate())).slice(-2);
    this.fechaHasta = MyDateString;

    this.fechaDesde = "2023-01-01";
    this.fechaHasta = "2023-01-18";

    this.obtenerRazones();
    this.obtenerDatos();
  }

  obtenerDatos() {

    this._service.obtenerEventos("H9", this.fechaDesde, this.fechaHasta).subscribe(
      result => {
        this.datos = result;

        console.log(this.datos);
      },
      error => {
        console.log(error);
      });

  }

  obtenerRazones(){
    this._service.obtenerRazones().subscribe(
      result => {
        this.razones = result;
      },
      error => {
        console.log(error);
      });
  }

  editarEvento(id:any,evento:any){
    this._service.editarEvento(id,evento).subscribe(
      result => {
        this.obtenerDatos();
      },
      error => {
        console.log(error);
      });
  }

}
