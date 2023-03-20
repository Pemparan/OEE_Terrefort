import { Injectable, transition } from '@angular/core';
import { HttpClientJsonpModule, HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ResponseContentType } from '@angular/http';
import { Headers } from '@angular/http'
const apiUrl = "rutaejemplo";

@Injectable()
export class EjemploService {

  private host: any = apiUrl;
  private headerPost: any;
  private headerPut:any;
  private headerGet: any;

  constructor(private httpClient: HttpClient) {
    this.headerPost = new Headers({ 'Content-Type': 'application/json', "method": "post" });
    this.headerPut = new Headers({ 'Content-Type': 'application/json', "method": "put" });
    this.headerGet = new Headers({ 'Content-Type': 'application/json', "method": "get" });
  }

  obtenerEventos(equipo:any, fechaDesde:any, fechaHasta:any): Observable<any> {
    return this.httpClient.get('http://quimera.cl.lafarge.la/OEET_WebApi/api/Reportes/obtenerEventos?equipo='+equipo+"&fechaDesde="+fechaDesde+"&fechaHasta="+fechaHasta,this.headerGet);
  }
  obtenerKPI(equipo:any, fechaDesde:any, fechaHasta:any): Observable<any> {
    return this.httpClient.get('http://quimera.cl.lafarge.la/OEET_WebApi/api/Reportes/obtenerKPI?equipo='+equipo+"&fechaDesde="+fechaDesde+"&fechaHasta="+fechaHasta,this.headerGet);
  }
  editarEvento(id:any,oEET_Eventos:any): Observable<any> {
    return this.httpClient.put('http://quimera.cl.lafarge.la/OEET_WebApi/api/Reportes/EditarEvento?id='+id,oEET_Eventos,this.headerPut);
  }
  obtenerRazones(): Observable<any> {
    return this.httpClient.get('http://quimera.cl.lafarge.la/OEET_WebApi/api/Reportes/obtenerRazones',this.headerGet);
  }
  obtenerSeries(equipo:any, fechaDesde:any, fechaHasta:any): Observable<any> {
    return this.httpClient.get('http://quimera.cl.lafarge.la/OEET_WebApi/api/Reportes/series?equipo='+equipo+"&fechaDesde="+fechaDesde+"&fechaHasta="+fechaHasta,this.headerGet);
  }
  obtenerPareto(equipo:any, fechaDesde:any, fechaHasta:any): Observable<any> {
    return this.httpClient.get('http://quimera.cl.lafarge.la/OEET_WebApi/api/Reportes/graficopareto?equipo='+equipo+"&fechaDesde="+fechaDesde+"&fechaHasta="+fechaHasta,this.headerGet);
  }

}

