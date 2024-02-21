import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'portfolio',
    data: { pageTitle: 'fpmsApp.portfolio.home.title' },
    loadChildren: () => import('./portfolio/portfolio.routes'),
  },
  {
    path: 'stock',
    data: { pageTitle: 'fpmsApp.stock.home.title' },
    loadChildren: () => import('./stock/stock.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
