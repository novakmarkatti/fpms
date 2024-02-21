import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IPortfolio } from 'app/entities/portfolio/portfolio.model';
import { PortfolioService } from 'app/entities/portfolio/service/portfolio.service';
import { StockService } from '../service/stock.service';
import { IStock } from '../stock.model';
import { StockFormService } from './stock-form.service';

import { StockUpdateComponent } from './stock-update.component';

describe('Stock Management Update Component', () => {
  let comp: StockUpdateComponent;
  let fixture: ComponentFixture<StockUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let stockFormService: StockFormService;
  let stockService: StockService;
  let portfolioService: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), StockUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(StockUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StockUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    stockFormService = TestBed.inject(StockFormService);
    stockService = TestBed.inject(StockService);
    portfolioService = TestBed.inject(PortfolioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Portfolio query and add missing value', () => {
      const stock: IStock = { id: 456 };
      const portfolio: IPortfolio = { id: 1903 };
      stock.portfolio = portfolio;

      const portfolioCollection: IPortfolio[] = [{ id: 21915 }];
      jest.spyOn(portfolioService, 'query').mockReturnValue(of(new HttpResponse({ body: portfolioCollection })));
      const additionalPortfolios = [portfolio];
      const expectedCollection: IPortfolio[] = [...additionalPortfolios, ...portfolioCollection];
      jest.spyOn(portfolioService, 'addPortfolioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ stock });
      comp.ngOnInit();

      expect(portfolioService.query).toHaveBeenCalled();
      expect(portfolioService.addPortfolioToCollectionIfMissing).toHaveBeenCalledWith(
        portfolioCollection,
        ...additionalPortfolios.map(expect.objectContaining),
      );
      expect(comp.portfoliosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const stock: IStock = { id: 456 };
      const portfolio: IPortfolio = { id: 12390 };
      stock.portfolio = portfolio;

      activatedRoute.data = of({ stock });
      comp.ngOnInit();

      expect(comp.portfoliosSharedCollection).toContain(portfolio);
      expect(comp.stock).toEqual(stock);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStock>>();
      const stock = { id: 123 };
      jest.spyOn(stockFormService, 'getStock').mockReturnValue(stock);
      jest.spyOn(stockService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stock });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stock }));
      saveSubject.complete();

      // THEN
      expect(stockFormService.getStock).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(stockService.update).toHaveBeenCalledWith(expect.objectContaining(stock));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStock>>();
      const stock = { id: 123 };
      jest.spyOn(stockFormService, 'getStock').mockReturnValue({ id: null });
      jest.spyOn(stockService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stock: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stock }));
      saveSubject.complete();

      // THEN
      expect(stockFormService.getStock).toHaveBeenCalled();
      expect(stockService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStock>>();
      const stock = { id: 123 };
      jest.spyOn(stockService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stock });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(stockService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePortfolio', () => {
      it('Should forward to portfolioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(portfolioService, 'comparePortfolio');
        comp.comparePortfolio(entity, entity2);
        expect(portfolioService.comparePortfolio).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
