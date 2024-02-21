import { IPortfolio } from 'app/entities/portfolio/portfolio.model';

export interface IStock {
  id: number;
  symbol?: string | null;
  name?: string | null;
  quantity?: number | null;
  purchasePrice?: number | null;
  currentPrice?: number | null;
  portfolio?: IPortfolio | null;
}

export type NewStock = Omit<IStock, 'id'> & { id: null };
