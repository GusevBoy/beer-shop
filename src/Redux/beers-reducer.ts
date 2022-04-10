import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import { getBeers } from '../API/beers';
import { BeersType, BeersStateType, OptionsGetBeers } from '../interfaces/beers';

const CHANGE_LOAD = 'CHANGE_LOAD'
const SET_DATA = 'SET_DATA'
const SET_PAGE = 'SET_PAGE'
const CLEAR_PAGE = 'CLEAR_PAGE'
const CHANGE_OPTIONS = 'CHANGE_OPTIONS'

export const PAGE_SIZE = 18

type ChangeLoadActionType = {
    type: typeof CHANGE_LOAD,
    payload: {
        loading: boolean,
    }
}

type SetDataActionType = {
    type: typeof SET_DATA,
    payload: {
        data: BeersType,
    }
}

type ClearPageActionType = {
    type: typeof CLEAR_PAGE,
}

type ChangeOptionnsActionType = {
  type: typeof CHANGE_OPTIONS,
  payload: OptionsGetBeers
}

type SetPageActionType = {
  type: typeof SET_PAGE,
  payload: {
    page: number
  }
}


const initialState: BeersStateType = {
    data: [],
    loading: false,
    page: 0,
    pageSize: PAGE_SIZE,
    name: '',
    brewedBefore: '',
    brewedAfter: '',
}

const beersReducer = (state = initialState, action: AnyAction): BeersStateType  => {
    switch (action.type) {
      case SET_DATA:
        {
          return {
            ...state,
            data: [...state.data, ...action.payload.data, ],
          }
        }
      case SET_PAGE:
        return {
          ...state,
          page: action.payload.page,
        }
      case CLEAR_PAGE:
        {
            return {
              ...state,
              page: 0,
              data: [],
            }
        }
      case CHANGE_OPTIONS: 
        {
          console.log('action.payload', action.payload)
          console.log('action.payload2', {
            ...state,
            ...(action.payload.name && {name: action.payload.name}),
            ...(action.payload.brewedBefore && {brewedBefore: action.payload.brewedBefore}),
            ...(action.payload.brewedAfter && {brewedAfter: action.payload.brewedAfter}),
          })
          return {
            ...state,
            name: action.payload.name ? action.payload.name : '',
            brewedBefore: action.payload.brewedBefore ? action.payload.brewedBefore : '',
            brewedAfter: action.payload.brewedAfter ? action.payload.brewedAfter : '',
          }
        }
      case CHANGE_LOAD: 
        {
          return {
            ...state,   
            loading: action.payload.loading,
          }
        }
      default:
          return state;
    }
}

const onLoad = (): ChangeLoadActionType => ({type: CHANGE_LOAD, payload: {loading: true}})
const onUnLoad = (): ChangeLoadActionType => ({type: CHANGE_LOAD, payload: {loading: false}})
const setData = (data: BeersType): SetDataActionType => ({type: SET_DATA, payload: { data }})
const setPage = (page: number): SetPageActionType => ({type: SET_PAGE, payload: { page }})

export const changeOptions = (options?: OptionsGetBeers): ChangeOptionnsActionType => ({type: CHANGE_OPTIONS, payload: { ...options }})
export const clearPage = (): ClearPageActionType => ({type: CLEAR_PAGE})

export const getBeersThunk = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    page: number,
    options: OptionsGetBeers
  ) => {
    const {
      name = '',
      brewedBefore = '',
      brewedAfter = '',
    } = options
    dispatch(onLoad())
    dispatch(setPage(page + 1))
    getBeers(page + 1, PAGE_SIZE, name, brewedBefore, brewedAfter).then((result: { data: BeersType}) => {
      const { data } = result
      dispatch(setData(data))
      dispatch(onUnLoad())
    })
}

export default beersReducer