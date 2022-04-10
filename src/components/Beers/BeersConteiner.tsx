
import { connect } from 'react-redux';
import Beers from './Beers';
import { getBeersThunk, clearPage, changeOptions } from '../../Redux/beers-reducer'
import { addedItemActionCreator, removeItemActionCreator } from '../../Redux/cart-reducer'
import { RootState, AppDispatch } from '../../Redux/redux-store';
import { OptionsGetBeers, BeerType } from '../../interfaces/beers';

function mapStateToProps(state: RootState) {
  return {
    beers: state.beers,
    cart: state.cart,
    beer: state.beer,
  }
}

function mapDispatch(dispatch: AppDispatch) {
  return {dispatch}
}

const mergeProps = (stateProps: RootState, dispatchProps: { dispatch: AppDispatch }) => {
  const { beers, cart } = stateProps;
  const { name, brewedBefore, brewedAfter } = beers
  const { dispatch } = dispatchProps;
  const stateOptions = {
    name,
    brewedBefore,
    brewedAfter,
  }
  return {
      beers: beers,
      cart: cart,
      getBeers: () => {
        getBeersThunk(dispatch, beers.page, stateOptions );
      },
      getBeersOptions: (options: OptionsGetBeers) => {
        dispatch(clearPage())
        dispatch(changeOptions({
          ...stateOptions,
          ...options
        }))
        getBeersThunk(dispatch, 0, {...stateOptions, ...options});
      },
      addCartItem: (item: BeerType) => {
        dispatch(addedItemActionCreator(item))
      },
      removeCartItem: (item: BeerType) => {
        dispatch(removeItemActionCreator(item))
      }
  }
}


  const BeersConteiner = connect(mapStateToProps, mapDispatch, mergeProps) (Beers)
  export default BeersConteiner;