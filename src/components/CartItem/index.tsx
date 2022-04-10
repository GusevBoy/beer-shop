import styled from 'styled-components'
import { TextM, TextGrandL, TextGrandM } from '../Text'
import { BEER_COLOR } from '../../consts'
import Counter from '../Counter'

import {
	MdClose as CloseIcon,
} from 'react-icons/md';

type CartItemProps = {
	name: string,
	tagline: string,
	price: number,
	image: string,
	amount: number,
	onClickRemove: () => void,
	onClickIncrease: () => void,
	onClickDecrease: () => void,
}

const Wrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	top: 0;	
	width: 800px;
	height: 210px;
  margin: 0 auto;
  border-bottom: 1px solid ${BEER_COLOR};
`

const ImageWrap = styled.div`
  width: 75px;
  display: flex;
	justify-content: center;
`

const Image = styled.img`
	height: 150px;
  width: auto;
  max-width: 75px;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  width: 300px;
`

const RemoveButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	width: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid ${BEER_COLOR};
  margin-left: 30px;
`

const Price = styled.div`
  margin-left: 40px;
`

const Tagline = styled.div`
  span {
    font-weight: normal;
  }
`

const CartItem = ({
		name,
		tagline,
		price,
		image,
		onClickRemove,
		onClickIncrease,
		onClickDecrease,
		amount,
	}: CartItemProps) => {
  const total = (price || 1) * amount
  return (
		<Wrap>
      <ImageWrap>
        <Image src={image} alt={`Image beer: ${name}`} />
      </ImageWrap>
			<Description>
				<TextM ls bold mb={4}>
					{name}
				</TextM>
        <Tagline>
          <TextGrandL theme="beer">
            {tagline}
          </TextGrandL>
        </Tagline>
			</Description>
      <Counter
        margin='0 0 0 30px'
        amount={amount}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
			<RemoveButton onClick={() => onClickRemove()}>
				<CloseIcon color={BEER_COLOR} size={22} />
			</RemoveButton>
			<Price>
				<TextGrandM ls bold uppercase>
					${total.toFixed(1)}
				</TextGrandM>
			</Price>
		</Wrap>
  );
}

export default CartItem;
