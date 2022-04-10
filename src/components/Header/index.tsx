import styled from 'styled-components'
import { TitleBeer, TitleWhiteXS } from '../Text'
import { useNavigate } from "react-router-dom";
import { TiArrowLeftOutline as ArrowLeftIcon } from 'react-icons/ti';
import { BEER_COLOR } from '../../consts'
import CartInfo from '../CartInfo'

type HeaderProps = {
	title: string,
	amountCart?: number,
}

const Wrap = styled.header`
	position: sticky;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;	
  height: 70px;
	width: 100%;
	background: #151616;
	margin: 0 auto;
	z-index: 10;
`

const Cart = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	top: 30%;
  right: 100px;
`

const Button = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	top: 30%;
	left: 100px;
	color: #fff;
	cursor: pointer;
	div {
		transition: color 0.4s;
	}
	:hover div {
		color: ${BEER_COLOR};
	}
	span {
		transition: color 0.4s;
	}
	:hover span {
		color: ${BEER_COLOR};
	}
`

const IconWrap = styled.div`
	display: flex;
	align-items: center;
	margin: 0 4px 3px 0;
`

const Header = ({ title, amountCart }: HeaderProps) => {
	const navigate = useNavigate()

  return (
		<Wrap>
				<Button onClick={() => navigate(-1)}>
					<IconWrap>
						<ArrowLeftIcon size={22} />
					</IconWrap>
					<TitleWhiteXS>Back</TitleWhiteXS>
				</Button>
				<TitleBeer>
					{title}
				</TitleBeer>
        {Boolean(amountCart) && (
          <Cart>
            <CartInfo amount={amountCart || 0} />
          </Cart>
        )}
		</Wrap>
  );
}

export default Header;
