import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { WeatherDataComponent } from './features/weather-data/weather-data.component';
import { ChartComponent } from './features/chart/chart.component';
import { HeatIndexComponent } from './features/heat-index/heat-index.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDataComponent,
    ChartComponent,
    HeatIndexComponent,
  ],
  imports: [
    BrowserModule,
    TabViewModule,
    ButtonModule,
    ChartModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    SelectButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    InputSwitchModule,
    PaginatorModule,
    ReactiveFormsModule,
    MultiSelectModule,
    SliderModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
