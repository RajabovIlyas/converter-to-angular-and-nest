import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_ENDPOINT} from "../../common/constants";
import {ConversionTypeEnum} from "./enums/conversion-type.enum";
import {ConverterHistory} from "./interfaces/converter-history.interface";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  apiPath = 'conversion-history'

  constructor(private http: HttpClient) {}

  getHistoryByType(type: ConversionTypeEnum) {
    return this.http.get<ConverterHistory[]>(`${BASE_ENDPOINT}/${this.apiPath}`, {params: {type: type}});
  }
}
