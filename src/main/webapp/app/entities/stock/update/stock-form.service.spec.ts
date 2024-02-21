import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../stock.test-samples';

import { StockFormService } from './stock-form.service';

describe('Stock Form Service', () => {
  let service: StockFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockFormService);
  });

  describe('Service methods', () => {
    describe('createStockFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStockFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            symbol: expect.any(Object),
            name: expect.any(Object),
            quantity: expect.any(Object),
            purchasePrice: expect.any(Object),
            currentPrice: expect.any(Object),
            portfolio: expect.any(Object),
          }),
        );
      });

      it('passing IStock should create a new form with FormGroup', () => {
        const formGroup = service.createStockFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            symbol: expect.any(Object),
            name: expect.any(Object),
            quantity: expect.any(Object),
            purchasePrice: expect.any(Object),
            currentPrice: expect.any(Object),
            portfolio: expect.any(Object),
          }),
        );
      });
    });

    describe('getStock', () => {
      it('should return NewStock for default Stock initial value', () => {
        const formGroup = service.createStockFormGroup(sampleWithNewData);

        const stock = service.getStock(formGroup) as any;

        expect(stock).toMatchObject(sampleWithNewData);
      });

      it('should return NewStock for empty Stock initial value', () => {
        const formGroup = service.createStockFormGroup();

        const stock = service.getStock(formGroup) as any;

        expect(stock).toMatchObject({});
      });

      it('should return IStock', () => {
        const formGroup = service.createStockFormGroup(sampleWithRequiredData);

        const stock = service.getStock(formGroup) as any;

        expect(stock).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStock should not enable id FormControl', () => {
        const formGroup = service.createStockFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStock should disable id FormControl', () => {
        const formGroup = service.createStockFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
