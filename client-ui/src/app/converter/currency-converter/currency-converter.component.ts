import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {debounce, debounceTime, distinctUntilChanged} from "rxjs";
import {ConverterHistory} from "../../history/interfaces/converter-history.interface";
import {ConverterType} from "../interfaces/converter-type.interface";
import {HistoryService} from "../../history/history.service";
import {ConverterService} from "../converter.service";
import {ConversionTypeEnum} from "../../history/enums/conversion-type.enum";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  apiPath = 'currency-converter';
  historyList: ConverterHistory[] = [];
  converterTypes: ConverterType[] = [];
  calculateValue = 0;
  form = new FormGroup({
    initialValue: new FormControl(0),
    convertedValue: new FormControl(0),
    initialValueType: new FormControl(),
    convertedValueType: new FormControl(),
  });


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private converterService: ConverterService,
    private historyService: HistoryService,
  ) {
    this.converterService.apiPath = this.apiPath;
  }

  ngOnInit(): void {
    this.loadCurrencyTypes()
    this.loadHistory()


    this.form
      .get('initialValue')?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe((initialValue: number | null) => {
        if(this.calculateValue === initialValue){
          return;
        }

        const {convertedValueType, initialValueType} = this.form.value;
        const body = {
          initialValue,
          initialValueType,
          convertedValueType,
        }
        this.converterService
          .calculateCurrencyConverter(body)
          .subscribe(({
                        convertedValue,
                        conversionHistory
                      }) => {
            this.calculateValue = convertedValue;
            this.form.patchValue({convertedValue})
            this.historyList.unshift(conversionHistory);
            if (this.historyList.length > 10) {
              this.historyList.pop()
            }
          })
      });

    this.form
      .get('convertedValue')?.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe((convertedValue: number | null) => {
        if(this.calculateValue === convertedValue){
          return;
        }

        const {convertedValueType, initialValueType} = this.form.value;
        const body = {
          initialValue: convertedValue,
          initialValueType: convertedValueType,
          convertedValueType: initialValueType,
        }

        this.converterService
          .calculateCurrencyConverter(body)
          .subscribe(({
                        conversionHistory,
                        convertedValue
                      }) => {
            this.calculateValue = convertedValue;
            this.form.patchValue({initialValue: convertedValue})
            this.historyList.unshift(conversionHistory);
            if (this.historyList.length > 10) {
              this.historyList.pop()
            }
          })
      });
  }

  private loadHistory() {
    this.historyService.getHistoryByType(ConversionTypeEnum.currency).subscribe((history) => {
      this.historyList = history;
    })
  }

  private loadCurrencyTypes() {
    this.converterService
      .getCurrencyTypes()
      .subscribe(
        (converterTypes: ConverterType[]) => (this.converterTypes = converterTypes)
      );
  }
}
