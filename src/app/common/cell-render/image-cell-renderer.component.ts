import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'image-cell-renderer',
  standalone: true,
  template: `
    <div class="imageCell">
      <div class="image">
        <img [src]="image" [alt]="image" />
      </div>
    </div>
  `,
  styles: [
    `
      .productCell {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .image {
        width: 160;
        height: 200px;
        background-color: rgba(201, 201, 201, 0.2);
        border-radius: 8px;
        margin: 8px;
        padding-bottom: 5px;
        padding-top: 5px;
      }

      .image img {
        width: 100%;
        height: 100%;
      }

      .productCell div:first-child {
        font-weight: 500;
      }

      .productCell div {
        padding-bottom: 0;
        line-height: 1.5;
      }

      .productCell img {
        border-radius: 8px;
      }

      .stockCell {
        background-color: var(--color-bg-secondary);
        color: var(--color-text-secondary);
        width: fit-content;
        border: 1px solid #c0c0c057;
        border-radius: 6px;
        padding-top: 2px;
        margin-top: 4px;
        padding-right: 4px;
        padding-left: 4px;
        font-size: 12px;
      }
    `,
  ],
})
export class ImageCellRenderer implements ICellRendererAngularComp {
  public image: string = '';

  agInit(params: ICellRendererParams): void {
    this.image = 'img/games/' + params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.image = 'img/games/' + params.value;
    return true;
  }
}
