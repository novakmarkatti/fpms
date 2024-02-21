import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPortfolio } from 'app/entities/portfolio/portfolio.model';
import { PortfolioService } from 'app/entities/portfolio/service/portfolio.service';
import { IStock } from '../stock.model';
import { StockService } from '../service/stock.service';
import { StockFormService, StockFormGroup } from './stock-form.service';

@Component({
  standalone: true,
  selector: 'jhi-stock-update',
  templateUrl: './stock-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class StockUpdateComponent implements OnInit {
  isSaving = false;
  stock: IStock | null = null;

  portfoliosSharedCollection: IPortfolio[] = [];

  editForm: StockFormGroup = this.stockFormService.createStockFormGroup();

  constructor(
    protected stockService: StockService,
    protected stockFormService: StockFormService,
    protected portfolioService: PortfolioService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  comparePortfolio = (o1: IPortfolio | null, o2: IPortfolio | null): boolean => this.portfolioService.comparePortfolio(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stock }) => {
      this.stock = stock;
      if (stock) {
        this.updateForm(stock);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stock = this.stockFormService.getStock(this.editForm);
    if (stock.id !== null) {
      this.subscribeToSaveResponse(this.stockService.update(stock));
    } else {
      this.subscribeToSaveResponse(this.stockService.create(stock));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStock>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(stock: IStock): void {
    this.stock = stock;
    this.stockFormService.resetForm(this.editForm, stock);

    this.portfoliosSharedCollection = this.portfolioService.addPortfolioToCollectionIfMissing<IPortfolio>(
      this.portfoliosSharedCollection,
      stock.portfolio,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.portfolioService
      .query()
      .pipe(map((res: HttpResponse<IPortfolio[]>) => res.body ?? []))
      .pipe(
        map((portfolios: IPortfolio[]) =>
          this.portfolioService.addPortfolioToCollectionIfMissing<IPortfolio>(portfolios, this.stock?.portfolio),
        ),
      )
      .subscribe((portfolios: IPortfolio[]) => (this.portfoliosSharedCollection = portfolios));
  }
}
