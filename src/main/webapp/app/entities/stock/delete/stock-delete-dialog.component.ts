import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IStock } from '../stock.model';
import { StockService } from '../service/stock.service';

@Component({
  standalone: true,
  templateUrl: './stock-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class StockDeleteDialogComponent {
  stock?: IStock;

  constructor(
    protected stockService: StockService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stockService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
