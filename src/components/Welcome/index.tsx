
import styled from 'styled-components'
import BeersImg from '../../img/beers.jpg'
import LogoImg from '../../img/logo.png'
import { TextS, TitleWelcome, SubTitleWelcome } from '../Text'
import CartInfo from '../CartInfo'
import { BEER_COLOR } from '../../consts'

import {
	AiOutlineInstagram as  InstagramIcon,
} from 'react-icons/ai'
import {
	IoLogoFacebook as FacebookIcon,
} from 'react-icons/io'
import {
	FaTwitterSquare as TwitterIcon,
	FaMapMarkerAlt as MarketIcon
} from 'react-icons/fa'

const Wrap = styled.div`
	position: relative;
  background-color: #101112;
  background-image: url(${BeersImg});
  background-position: center;
  background-size: cover;
  height: 500px;
	width: 100%;
	border-bottom: 3px solid ${BEER_COLOR};
`

const Inner = styled.div`
  display: flex;
  width: 1170px;
  margin: 30px auto 0;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 20px 30px;
  background: transparent;
  z-index: 13;
`

const ShadowLayout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
		background: rgba(16,17,18,0.86);
		z-index: 2;
`

const LogoWrap = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 116px;
	height: 118px;
	z-index: 3;
`

const Header = styled.header`
	position: relative;
	z-index: 3;
	display: grid; 
	grid-template-columns: 1fr 3fr 0.8fr 1fr; 
	grid-template-rows: 46px; 
	gap: 0px 0px;
	border-bottom: 1px solid rgba(255,255,255,0.2);
	width: 100%;
`
const HeaderItem = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 12px 15px;
	border-right: 1px solid rgba(255,255,255,0.2);
`

const HeaderItemLeft = styled(HeaderItem)`
	justify-content: flex-start;
`

const HeaderItemLeftWithoutBorder = styled(HeaderItemLeft)`
	border: none;
`

const Icon = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-left: 12px;
	svg {
		color: #fff;
		transition: color 0.5s;
	}
	span {
		color: #fff;
		transition: color 0.5s;
	}
	:hover {
		color: ${BEER_COLOR};
	}
	:hover svg {
		color: ${BEER_COLOR};
	}
	:hover span {
		color: ${BEER_COLOR};
	}
`

const IconWithoutMargin = styled(Icon)`
	margin: 0;
`

const HelloBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Welcome = (props: {
	amountItemsCart: number
}) => {
  return (  
    <Wrap>
			<Header>
				<HeaderItem>
					<Icon><InstagramIcon size="18" /></Icon>
					<Icon><FacebookIcon size="18" /></Icon>
					<Icon><TwitterIcon size="18" /></Icon>
				</HeaderItem>
				<HeaderItem></HeaderItem>
				<HeaderItemLeft>
					<IconWithoutMargin>
						<MarketIcon size="14" />
						<TextS theme="white" ml={10}>
							Find our beer
						</TextS>
					</IconWithoutMargin>
				</HeaderItemLeft>
				<HeaderItemLeftWithoutBorder>
					<IconWithoutMargin>
						<CartInfo amount={props.amountItemsCart} />
					</IconWithoutMargin>
				</HeaderItemLeftWithoutBorder>
			</Header>
			<ShadowLayout />
			<Inner>
				<LogoWrap>
					<img src={LogoImg} alt="Crafr Beer compony ESR 1956. This is Logo."/>	
				</LogoWrap>
        <HelloBlock>
          <SubTitleWelcome>
            A very warm welcome to our
          </SubTitleWelcome>
          <TitleWelcome>
            BEER SHOP
          </TitleWelcome>
        </HelloBlock> 
        <LogoWrap />
			</Inner>
		</Wrap>
  );
}

export default Welcome;
