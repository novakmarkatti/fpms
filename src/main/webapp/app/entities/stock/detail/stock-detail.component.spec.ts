import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { StockDetailComponent } from './stock-detail.component';

describe('Stock Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: StockDetailComponent,
              resolve: { stock: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(StockDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load stock on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', StockDetailComponent);

      // THEN
      expect(instance.stock).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
