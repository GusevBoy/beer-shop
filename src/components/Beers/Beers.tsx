import { useEffect } from 'react'
import styled from 'styled-components'
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { TextM, TextGrandM, TextS, LinkWrap } from '../Text'
import { BeersStateType, BeerType, OptionsGetBeers } from '../../interfaces/beers'
import { CartStateType } from '../../interfaces/cart'
import { PAGE_SIZE } from '../../Redux/beers-reducer'
import Welcome from '../Welcome'
import Filters from '../Filters'

import {
	IoIosCart as CartIcon,
} from 'react-icons/io'
import { BEER_COLOR } from '../../consts'

type BeersProps = {
  beers: BeersStateType,
  cart: CartStateType,
  getBeers: () => void,
  getBeersOptions: (options: OptionsGetBeers) => void,
  addCartItem: (item: BeerType) => void,
  removeCartItem: (item: BeerType) => void,
}

const Gap = styled.div`
  margin: 0 auto;
  width: 1200px;
  min-height: 1200px;
  display: grid; 
  grid-template-columns: repeat(3, auto); 
  grid-template-rows: repeat(6, auto);
  grid-auto-columns: auto;
  grid-auto-rows: auto;
  gap: 0px 0px;
`

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid #ededed;
  border-right: 1px solid #ededed;
  height: 400px;
  width: 400px;
  :hover p {
    background: rgba(255,255,255,0.95)
    
  }
  :hover p span {
    opacity: 1;
  }
  :nth-child(3n) {
    border-right: none;
  };
`
const ItemModal = styled.p`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0);
  transition: background 0.5s;
`

const ItemModalButton = styled.span<{borderBottomNone?: boolean, top: number, pointerNone?: boolean}>`
  position: absolute;
  width: 224px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${BEER_COLOR};
  top: ${props => `${props.top}px`};
  left: 0;
  right: 0;
  margin: 0 auto;
  border-top: 1px solid ${BEER_COLOR};
  opacity: 0;
  transition: opacity 0.5s;
  cursor: ${props => props.pointerNone ? '' : 'pointer'};
  border-bottom: ${props => props.borderBottomNone ? 'none' : `1px solid ${BEER_COLOR}`};
`

const Image = styled.img`
  height: 200px;
  width: auto;
  margin-bottom: 15px;
`

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
`

const Icon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`

const CounterCart = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 20px;
    height: 20px;
    font-size: 25px;
    padding: none;
    border: none;
    margin: none;
    background: none;
    color: ${BEER_COLOR};
  }
`


const Beers = (props: BeersProps) => {

  const { beers: { data, brewedBefore, brewedAfter, name }, getBeers, getBeersOptions, addCartItem, removeCartItem, cart } = props
  const amountItemsCart = cart.items.reduce((accum, value) => value.amount + accum, 0)
  useEffect(() => {
    getBeers()
  }, [])

  console.log('data 666 1 ', data)

  const loadMoreItems = () => {
    getBeers()
  }

  const scroll = () => {
    window.scrollTo({
      top: 504,
      behavior: "smooth"
    });
  }

  const onClickLatest = () => {
    scroll()
    getBeersOptions({
      brewedBefore: '10-2020',
      brewedAfter: '',
    })
  }

  const onClickFeatured = () => {
    scroll()
    getBeersOptions({
      brewedAfter: '10-2020',
      brewedBefore: '',
    })
  }

  const onChangeSearch = (value: string) => {
    scroll()
    getBeersOptions({
      name: value
    })
  }

  const onClickRemoveOptions = () => {
    getBeersOptions({
      brewedAfter: '',
      brewedBefore: '',
      name: '',
    })
  }

  return (
  <div>
      <Welcome
        amountItemsCart={amountItemsCart}
      />
      <Filters
        amountItemsCart={amountItemsCart}
        onClickLatest={onClickLatest}
        onClickFeatured={onClickFeatured}
        onChangeSearch={onChangeSearch}
        onClickRemove={onClickRemoveOptions}
        activeLattest={Boolean(brewedBefore)}
        activeFeatured={Boolean(brewedAfter)}
        searchName={name}
      />
        <InfiniteScroll 
          dataLength={data.length}
          next={loadMoreItems}
          hasMore={data.length >= PAGE_SIZE}
          loader={<h4>Loading...</h4>}
          scrollThreshold={0.9}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Gap>
            {data.map((item, index) => {
                const amountItem = cart.items.find(({ beer }) => beer.id === item.id)?.amount
                return (
                  <Item key={index}>
                    <ItemModal>
                      <ItemModalButton top={100}>
                      <LinkWrap>
                        <Link to={`beer/${item.id}`}>
                          <TextS ls bold uppercase theme="beer">
                            MORE INFO
                          </TextS>
                        </Link>
                      </LinkWrap>
                      </ItemModalButton>
                      <ItemModalButton
                        top={141}
                        pointerNone={Boolean(amountItem)}
                        onClick={() => !amountItem && addCartItem(item)}
                      >
                        <TextS ls bold uppercase theme="beer">
                          {amountItem ? (
                            <CounterCart>
                              <button onClick={() => removeCartItem(item)}>-</button>
                              <span>{amountItem}</span>
                              <button onClick={() => addCartItem(item)}>+</button>
                            </CounterCart>
                          ) :  'ADD TO CART'}
                        </TextS>
                      </ItemModalButton>
                    </ItemModal>
                    <Icon>
                      {Boolean(amountItem) && (
                        <Link to="/cart">
                          <CartIcon color={BEER_COLOR} size="20" />
                        </Link>
                      )}
                      
                    </Icon>
                    <Image src={item.image_url} alt={`Best beer ${item.name}`}/>
                    <Text>
                      <TextM ls bold uppercase theme="beer">
                        {item.name}
                      </TextM>
                    </Text>
                    <TextGrandM ls bold uppercase>
                      {`$ ${item?.ph || '1.'}0`}
                    </TextGrandM>
                  </Item>
                )
              })
            }
          </Gap>
        </InfiniteScroll>
	</div>
  );
}

export default Beers;
