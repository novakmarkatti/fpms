import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStock, NewStock } from '../stock.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStock for edit and NewStockFormGroupInput for create.
 */
type StockFormGroupInput = IStock | PartialWithRequiredKeyOf<NewStock>;

type StockFormDefaults = Pick<NewStock, 'id'>;

type StockFormGroupContent = {
  id: FormControl<IStock['id'] | NewStock['id']>;
  symbol: FormControl<IStock['symbol']>;
  name: FormControl<IStock['name']>;
  quantity: FormControl<IStock['quantity']>;
  purchasePrice: FormControl<IStock['purchasePrice']>;
  currentPrice: FormControl<IStock['currentPrice']>;
  portfolio: FormControl<IStock['portfolio']>;
};

export type StockFormGroup = FormGroup<StockFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StockFormService {
  createStockFormGroup(stock: StockFormGroupInput = { id: null }): StockFormGroup {
    const stockRawValue = {
      ...this.getFormDefaults(),
      ...stock,
    };
    return new FormGroup<StockFormGroupContent>({
      id: new FormControl(
        { value: stockRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      symbol: new FormControl(stockRawValue.symbol),
      name: new FormControl(stockRawValue.name),
      quantity: new FormControl(stockRawValue.quantity),
      purchasePrice: new FormControl(stockRawValue.purchasePrice),
      currentPrice: new FormControl(stockRawValue.currentPrice),
      portfolio: new FormControl(stockRawValue.portfolio),
    });
  }

  getStock(form: StockFormGroup): IStock | NewStock {
    return form.getRawValue() as IStock | NewStock;
  }

  resetForm(form: StockFormGroup, stock: StockFormGroupInput): void {
    const stockRawValue = { ...this.getFormDefaults(), ...stock };
    form.reset(
      {
        ...stockRawValue,
        id: { value: stockRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StockFormDefaults {
    return {
      id: null,
    };
  }
}
