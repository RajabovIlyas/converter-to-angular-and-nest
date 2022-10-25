import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryListComponent } from './history-list.component';



@NgModule({
  declarations: [
    HistoryListComponent
  ],
  exports: [
    HistoryListComponent
  ],
  imports: [
    CommonModule,
  ],
  bootstrap: [HistoryListComponent]
})
export class HistoryListModule { }
