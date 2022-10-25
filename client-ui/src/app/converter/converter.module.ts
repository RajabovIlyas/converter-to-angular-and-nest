import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CurrencyConverterComponent} from "./currency-converter/currency-converter.component";
import {HttpClientModule} from "@angular/common/http";
import {HistoryListModule} from "../converter-history-list/history-list.module";
import {DistanceConverterComponent} from "./distance-converter/distance-converter.component";


@NgModule({
  declarations: [
    CurrencyConverterComponent,
    DistanceConverterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    HistoryListModule,
  ],
  exports: [
    CurrencyConverterComponent,
    DistanceConverterComponent
  ]
})
export class ConverterModule {
}
