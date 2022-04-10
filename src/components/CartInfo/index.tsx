

import { TextWhiteSM, LinkWrap } from '../Text'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { BEER_COLOR } from '../../consts'

import {
	IoIosCart as CartIcon,
} from 'react-icons/io'

const Wrap = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	div {
		transition: color 0.5s;
	}
	:hover {
		div {
			color: ${BEER_COLOR};
		}
	}
	span {
		transition: color 0.5s;
	}
	:hover {
		span {
			color: ${BEER_COLOR};
		}
	}
`
const CartButton = ({ amount }: {
	amount: number
}) => {
  const textAmount = amount === 1 ? `${amount} item` : `${amount} items`
  return (
    <LinkWrap>
      <Link to="/cart">
        <Wrap>
          <CartIcon color={BEER_COLOR} size="17" />
          <TextWhiteSM ml={10}>
            {amount ? textAmount : 'Empty'}
          </TextWhiteSM>
        </Wrap>
      </Link>
    </LinkWrap>
  );
}

export default CartButton;
