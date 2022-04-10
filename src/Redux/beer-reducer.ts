import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { BeerType, BeersType } from '../interfaces/beers';
import { BeerStateType, SimilarType } from '../interfaces/beer';
import { getSimilarBeers, getBeer } from '../API/beers';

const SET_BEER = 'SET_BEER'
const REMOVE_ITEM = 'REMOVE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

type PayloadBeerItem = {
  item: BeerType,
}

type SerBeerActionType = {
    type: typeof SET_BEER,
    payload: {
      beer: BeerType | null
    }
}
  
type RemoveItemActionType = {
    type: typeof REMOVE_ITEM,
    payload: PayloadBeerItem
}

type DeleteItemActionType = {
  type: typeof DELETE_ITEM,
  payload: {
    id: number,
  }
}


const initialState: BeerStateType = {
    similarBeers: [],
    beer: null,
}

const beerReducers = (state = initialState, action: AnyAction): BeerStateType  => {
    switch (action.type) {
      case SET_BEER:
        {
          const { beer } = action.payload
          return {
            ...state,
            beer,
          }
        }
      default:
          return state;
    }
}

export const addedBeer = (beer: BeerType): SerBeerActionType => ({type: SET_BEER, payload: { beer }})

export const getBeerThunk = (dispatch: ThunkDispatch<{}, {}, AnyAction>, id: string) => {
  getBeer(id).then((result: { data: BeersType}) => {
    const { data } = result
    dispatch(addedBeer(data[0]))
  })
}

export const getSimilarBeersThunk = (dispatch: ThunkDispatch<{}, {}, AnyAction>, abv: SimilarType, ibu: SimilarType) => {
  getSimilarBeers(abv, ibu).then((result: { data: BeersType}) => {
    const { data } = result
    console.log('result', result)
  })
}


export default beerReducers