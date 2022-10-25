import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_ENDPOINT} from "../../common/constants";
import {ConverterType} from "./interfaces/converter-type.interface";
import {CurrencyConverterBody} from "./interfaces/currency-converter-body.interface";
import {CurrencyRequest} from "./interfaces/currency-request.interface";

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  apiPath: string | undefined;

  constructor(private http: HttpClient) {}

  getCurrencyTypes() {
    return this.http.get<ConverterType[]>(`${BASE_ENDPOINT}/${this.apiPath}/types`);
  }

  calculateCurrencyConverter(body: CurrencyConverterBody) {
    return this.http.post<CurrencyRequest>(`${BASE_ENDPOINT}/${this.apiPath}`, body);
  }
}
