import styled from 'styled-components'
import Header from '../Header'
import CartItem from '../CartItem'
import { TitleGrandBeer } from '../Text'
import { CartStateType } from "../../interfaces/cart";
import { BeerType } from '../../interfaces/beers';

type CartProps = {
  cart: CartStateType,
  addCartItem: (item: BeerType) => void,
  removeCartItem: (item: BeerType) => void,
  deleteCartItem: (id: number) => void,
}

const Wrap = styled.div`
	position: relative;
`

const GrandTotal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 45px auto;
`

const Cart = (props: CartProps) => {
  const {
    cart: { items },
    addCartItem,
    removeCartItem,
    deleteCartItem,
  } = props
  const grandTotal = items.reduce((acum, {beer, amount}) => acum + (amount * (beer?.ph || 1)), 0)
  return (
    <Wrap>
			<Header
				title='Beer Cart'
			/>
			{items.map(({ beer, amount}) => {
				return (
          <div key={`${beer.id} ${beer.name}`}>
            <CartItem
              name={beer.name}
              tagline={beer.tagline}
              price={beer.ph}
              image={beer.image_url}
              amount={amount}
              onClickRemove={() => deleteCartItem(beer.id)}
              onClickIncrease={() => addCartItem(beer)}
              onClickDecrease={() => removeCartItem(beer)}
            />
          </div>
				)
			})}
      <GrandTotal>
        <TitleGrandBeer>
          {Boolean(items.length) ? `Grand Total: ${grandTotal.toFixed(1)}` : 'Sorry no beer :('}
        </TitleGrandBeer>
      </GrandTotal>
    </Wrap>
  );
}

export default Cart;
