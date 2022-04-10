
import { connect } from 'react-redux';
import Cart from './Cart'
import { RootState, AppDispatch } from '../../Redux/redux-store';
import { addedItemActionCreator, removeItemActionCreator, deleteItemActionCreator } from '../../Redux/cart-reducer'
import { BeerType } from '../../interfaces/beers';

function mapStateToProps(state: RootState) {
  return {
    beers: state.beers,
    cart: state.cart,
  }
}


function mapDispatch(dispatch: AppDispatch) {
  return {
    addCartItem: (item: BeerType) => {
      dispatch(addedItemActionCreator(item))
    },
    removeCartItem: (item: BeerType) => {
      dispatch(removeItemActionCreator(item))
    },
    deleteCartItem: (id: number) => {
      dispatch(deleteItemActionCreator(id))
    }
  }
}

  const CartConteiner = connect(mapStateToProps, mapDispatch) (Cart)
  export default CartConteiner;