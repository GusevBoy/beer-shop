import { useState } from 'react'
import { useWindowScroll } from 'beautiful-react-hooks'; 
import styled from 'styled-components'
import Button from '../Button'
import CartInfo from '../CartInfo';
import Search from '../Search';
import {
	MdClose as CloseIcon,
} from 'react-icons/md';
import { BEER_COLOR } from '../../consts';

type FiltersProps = {
	amountItemsCart: number,
	onClickLatest: () => void,
	onClickFeatured: () => void,
	onClickRemove: () => void,
  onChangeSearch: (value: string) => void,
  activeLattest?: boolean,
  activeFeatured?: boolean,
  searchName: string,
}

const Wrap = styled.div`
	position: sticky;
	display: flex;
	align-items: center;
	top: 0;
  background-color: #101112;
  height: 70px;
	width: 100%;
	background: rgba(16,17,18,0.86);
	margin: 0 auto;
	z-index: 10;
	:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(16,17,18,0.86);
    z-index: 2;
	}
`

const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	width: 1170px;
	z-index: 4;
`

const Buttons = styled.div`
	display: flex;
	justify-content: flex-start;
`

const RemoveButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 37px;
	width: 37px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid ${BEER_COLOR};
  margin-left: 30px;
`

const Filters = (props: FiltersProps) => {
	const {
    onChangeSearch,
    onClickLatest,
    onClickFeatured,
    onClickRemove,
    amountItemsCart,
    activeLattest = false,
    activeFeatured = false,
    searchName,
  } = props
	const [showCart, setShowCart] = useState(false)
	useWindowScroll(() => {
		if(window.scrollY > 80) {
			setShowCart(true)
		} else {
			setShowCart(false)
		}
  });
  const isShowRemoveButton = activeLattest || activeFeatured || Boolean(searchName)

  return (
    <Wrap>
			<Inner>
				<Buttons>
					<Button active={activeLattest} onClick={() => onClickLatest()}>
						LATEST
					</Button>
					<Button active={activeFeatured} onClick={() => onClickFeatured()} margin='0 0 0 20px'>
						FEATURED
					</Button>
					<Search value={searchName} onChange={onChangeSearch} ml={20} />
          {isShowRemoveButton && (
            <RemoveButton onClick={() => onClickRemove()}>
              <CloseIcon color={BEER_COLOR} size={22} />
            </RemoveButton>
          )}
				</Buttons>
				{showCart && (
					<CartInfo amount={amountItemsCart} />
				)}
			</Inner>
    </Wrap>
  );
}

export default Filters;
