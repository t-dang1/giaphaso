import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-link-cell-renderer',
  template: `<a [href]= "getLink()">{{ params.value }}</a>`
})
export class UrlCellRenderer implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  getLink(): string {
    return `/dashboard/gamelistdetail?outputid=${this.params.value}`;
  }
}