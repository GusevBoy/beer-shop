import { BeerType } from '../interfaces/beers';

type ItemCart = {
	amount: number,
	beer: BeerType
}
  
export type CartStateType = {
	items: ItemCart[],
}