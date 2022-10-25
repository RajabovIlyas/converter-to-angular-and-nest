import {Component, Input, OnInit} from '@angular/core';
import {ConverterHistory} from "../history/interfaces/converter-history.interface";

@Component({
  selector: 'app-converter-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() historyList: ConverterHistory[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
