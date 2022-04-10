import { BeerType } from '../interfaces/beers';

export type BeerStateType = {
  similarBeers: BeerType[],
	beer: BeerType | null
}

export type SimilarType = {
  gt: string,
  lt: string,
}