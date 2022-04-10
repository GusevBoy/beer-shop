import { AnyAction } from 'redux';
import { BeerType } from '../interfaces/beers';
import { CartStateType } from '../interfaces/cart';


const ADDED_ITEM = 'ADDED_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

type PayloadBeerItem = {
  item: BeerType,
}

type AddedItemActionType = {
    type: typeof ADDED_ITEM,
    payload: PayloadBeerItem
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


const initialState: CartStateType = {
    items: [],
}

const cartReducers = (state = initialState, action: AnyAction): CartStateType  => {
    switch (action.type) {
      case ADDED_ITEM:
        {
          const { items } = state
          const { item } = action.payload
          const indexItem = items.findIndex(({ beer }) => beer.id === item.id)
          if(indexItem > -1) {
            items[indexItem] = {
              ...items[indexItem],
              amount: items[indexItem].amount + 1
            }
          } else {
            items.push({
              amount: 1,
              beer: item,
            })
          }
          return {
            ...state,
            items,
          }
        }
      case REMOVE_ITEM:
        {
          const { items } = state
          const { item } = action.payload
          const indexItem = items.findIndex(({ beer }) => beer.id === item.id)
          if(indexItem > -1) {
            const newAmount = items[indexItem].amount - 1
            items[indexItem] = {
              ...items[indexItem],
              amount: newAmount > 0 ? newAmount : 0
            }
            return {
              ...state,
              items,
            }
          }
          return state
        }
      case DELETE_ITEM:
        {
          const { items } = state
          const { id } = action.payload
          return {
            ...state,
            items: items.filter(({ beer }) => beer.id !== id),
          }
        }
      default:
          return state;
    }
}

export const addedItemActionCreator = (item: BeerType): AddedItemActionType => ({type: ADDED_ITEM, payload: { item }})
export const removeItemActionCreator = (item: BeerType): RemoveItemActionType => ({type: REMOVE_ITEM, payload: { item }})
export const deleteItemActionCreator = (id: number): DeleteItemActionType => ({type: DELETE_ITEM, payload: { id }})


export default cartReducers