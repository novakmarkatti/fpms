import { IPortfolio, NewPortfolio } from './portfolio.model';

export const sampleWithRequiredData: IPortfolio = {
  id: 590,
};

export const sampleWithPartialData: IPortfolio = {
  id: 24386,
  emailAddress: 'undertaker um',
};

export const sampleWithFullData: IPortfolio = {
  id: 66,
  userName: 'practical till overrun',
  emailAddress: 'catsup',
};

export const sampleWithNewData: NewPortfolio = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
