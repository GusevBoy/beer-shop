
import { connect } from 'react-redux';
import Beer from './Beer';
import { getBeerThunk, addedBeer, getSimilarBeersThunk, setSimilarBeers } from '../../Redux/beer-reducer'
import { RootState, AppDispatch } from '../../Redux/redux-store';
import { BeerType, BeersType } from '../../interfaces/beers';
import { SimilarType } from '../../interfaces/beer';
import { addedItemActionCreator, removeItemActionCreator } from '../../Redux/cart-reducer'
function mapStateToProps(state: RootState) {
  return {
    beer: state.beer,
    beers: state.beers,
    cart: state.cart,
  }
}

function mapDispatch(dispatch: AppDispatch) {
  return {dispatch}
}

const mergeProps = (stateProps: RootState, dispatchProps: { dispatch: AppDispatch }) => {
  const { beer, cart, beers } = stateProps;
  const { dispatch } = dispatchProps;
  return {
      beer: beer.beer,
      similarBeers: beer.similarBeers,
      beers: beers.data,
      cart: cart,
      getBeer: (id: string) => getBeerThunk(dispatch, id),
      getSimilarBeers: (abv: SimilarType, ibu: SimilarType, id: string) => getSimilarBeersThunk(dispatch, abv, ibu, id),
      setSimilarBeers: (beers: BeersType) => dispatch(setSimilarBeers(beers)),
      addedBeer: (item: BeerType) => dispatch(addedBeer(item)),
      addCartItem: (item: BeerType) => {
        dispatch(addedItemActionCreator(item))
      },
      removeCartItem: (item: BeerType) => {
        dispatch(removeItemActionCreator(item))
      },
  }
}


  const BeerConteiner = connect(mapStateToProps, mapDispatch, mergeProps) (Beer)
  export default BeerConteiner;