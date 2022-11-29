import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WeatherDataComponent } from './features/weather-data/weather-data.component';
import { ChartComponent } from './features/chart/chart.component';
import { HeatIndexComponent } from './features/heat-index/heat-index.component';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    InputNumberModule,
    FormsModule,
    SelectButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
