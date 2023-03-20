import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

// App views
import {AppviewsModule} from "./views/appviews/appviews.module";


// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { EjemploService } from './services/ejemplo.service';
import { TablaEventosComponent } from './components/tabla-eventos/tabla-eventos.component';
import { Metricas1Component } from './components/metricas1/metricas1.component';


@NgModule({
  declarations: [
    AppComponent,
    TablaEventosComponent,
    Metricas1Component

  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES),
    NgxPaginationModule,
    CommonModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},EjemploService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
