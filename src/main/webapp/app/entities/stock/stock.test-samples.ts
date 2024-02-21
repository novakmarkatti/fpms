import { IStock, NewStock } from './stock.model';

export const sampleWithRequiredData: IStock = {
  id: 1936,
};

export const sampleWithPartialData: IStock = {
  id: 3847,
  quantity: 22500,
  purchasePrice: 21013.15,
  currentPrice: 8904.74,
};

export const sampleWithFullData: IStock = {
  id: 22245,
  symbol: 'overconfidently',
  name: 'closely cannibalise biodegradable',
  quantity: 16405,
  purchasePrice: 20844.8,
  currentPrice: 4943.39,
};

export const sampleWithNewData: NewStock = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
