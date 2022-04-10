

export type BeerType = {
	id: number;
	name: string;
	abv: number;
	ibu: number;
	tagline: string;
	ph: number;
	description: string;
	first_brewed: string;
	image_url: 'string';
}

export type BeersType = BeerType[]

export type BeersStateType = {
  data: BeersType,
  loading: boolean,
  page: number,
  pageSize: number,
  name: string,
  brewedBefore: string,
  brewedAfter: string,
}

export type OptionsGetBeers = {
	name?: string,
	brewedBefore?: string,
	brewedAfter?: string,
}