import { IStock } from 'app/entities/stock/stock.model';

export interface IPortfolio {
  id: number;
  userName?: string | null;
  emailAddress?: string | null;
  stocks?: IStock[] | null;
}

export type NewPortfolio = Omit<IPortfolio, 'id'> & { id: null };
