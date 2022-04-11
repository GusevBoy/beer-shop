import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk'
import { BeerType, BeersType } from '../interfaces/beers';
import { BeerStateType, SimilarType } from '../interfaces/beer';
import { getSimilarBeers, getBeer } from '../API/beers';

export const SIMILAR_BEERS = 'SIMILAR_BEERS'
const SET_BEER = 'SET_BEER'
const SET_SIMILAR_BEERS = 'SET_SIMILAR_BEERS'

type SetBeerActionType = {
    type: typeof SET_BEER,
    payload: {
      beer: BeerType | null
    }
}

type SetSimilarBeersActionType = {
    type: typeof SET_SIMILAR_BEERS,
    payload: {
      beers: BeersType
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
      case SET_SIMILAR_BEERS:
        {
          const { beers } = action.payload
          return {
            ...state,
            similarBeers: beers,
          }
        }
      default:
          return state;
    }
}

export const addedBeer = (beer: BeerType): SetBeerActionType => ({type: SET_BEER, payload: { beer }})
export const setSimilarBeers = (beers: BeersType): SetSimilarBeersActionType => ({type: SET_SIMILAR_BEERS, payload: { beers }})

export const getBeerThunk = (dispatch: ThunkDispatch<{}, {}, AnyAction>, id: string) => {
  getBeer(id).then((result: { data: BeersType}) => {
    const { data } = result
    dispatch(addedBeer(data[0]))
  })
}

export const getSimilarBeersThunk = (dispatch: ThunkDispatch<{}, {}, AnyAction>, abv: SimilarType, ibu: SimilarType, id: string) => {
  getSimilarBeers(abv, ibu).then((result: { data: BeersType}) => {
    const { data } = result
    localStorage.setItem(`${SIMILAR_BEERS}_${id}`, JSON.stringify(data))
    dispatch(setSimilarBeers(data))
  })
}


export default beerReducers