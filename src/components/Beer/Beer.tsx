import styled from 'styled-components'
import Header from '../Header'
import { TitleBeerCard, TextSM, SubTitleWelcome, TextGrandS, TextGrandM, TextL } from '../Text'
import Counter from '../Counter'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BeersType, BeerType } from '../../interfaces/beers'
import { SimilarType } from '../../interfaces/beer';
import { CartStateType } from '../../interfaces/cart'

type BeerProps = {
  beer: BeerType | null,
  cart: CartStateType,
  similarBeers: BeersType,
  beers: BeersType,
  getBeer: (id: string) => void,
  getSimilarBeers: (abv: SimilarType, ibu: SimilarType) => void,
  addedBeer: (item: BeerType) => void,
  addCartItem: (item: BeerType) => void,
  removeCartItem: (item: BeerType) => void,
}

const Wrap = styled.div`
	position: relative;
`

const Inner = styled.div`
  display: flex;
  align-items: center;
  margin: 60px auto 0;
  width: max-content;

`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 555px;
  margin-left: 50px;
`

const Image = styled.img`
  height: 400px;
  width: auto;
`

const AbvIbuBlock = styled.div`
  display: flex;
  margin-bottom: 15px;
`

const PriceBlock = styled.div`
  margin-bottom: 20px;
`

const Beer = (props: BeerProps) => {
  const {
    getBeer,
    getSimilarBeers,
    addedBeer,
    beers,
    beer,
    cart,
    addCartItem,
    removeCartItem
  } = props
  let { id } = useParams();


  const getAbv = (abv: number) => ({
    gt: `${(abv - 1 < 0 ? 0 : abv - 1 ).toFixed(2)}`,
    lt: `${(abv + 1 < 0 ? 0 : abv + 1 ).toFixed(2)}`,
  })

  const getIbu = (ibu: number) => ({
    gt: `${(ibu - 10 < 0 ? 0 : ibu - 10 ).toFixed(2)}`,
    lt: `${(ibu + 10 < 0 ? 0 : ibu + 10 ).toFixed(2)}`,
  })

  useEffect(() => {
    if(id) {

      const findBeer = beers.find((item) => item.id === Number(id))
      if(findBeer) {
        addedBeer(findBeer)
      } else {
        getBeer(id)
        
      }
    }
  }, [])

  useEffect(() => {
    if(beer) {
      getSimilarBeers(getAbv(beer.abv), getIbu(beer.abv))
    } 
  }, [beer])
  const amountItemsCart = cart.items.reduce((accum, value) => value.amount + accum, 0)
  const amount = cart.items.find((item) => item.beer.id === beer?.id)?.amount || 0
  return (
    <Wrap>
			<Header
        title={beer?.name || ''}
        amountCart={amountItemsCart}
			/>
      <Inner>
        <Image src={beer?.image_url || ''} alt={`Beer: ${beer?.name || ''}`} />
        <Description>
          <AbvIbuBlock>
            <TextGrandS theme="beer">
              ABV: {beer?.abv ? `${beer.abv}%` : ''}
            </TextGrandS>
            <TextGrandS theme="beer"  ml={10}>
              IBU: {beer?.ibu || ''}
            </TextGrandS>
          </AbvIbuBlock>
          <TitleBeerCard>
            {beer?.name || ''}
          </TitleBeerCard>
          <TextL mt={2}>
            {beer?.tagline || ''}
          </TextL>
          <TextSM mt={10} mb={20}>
            {beer?.description || ''}
          </TextSM>
          <PriceBlock>
            <SubTitleWelcome>
              {`$ ${beer?.ph || '1.'}0`}
            </SubTitleWelcome>
          </PriceBlock> 
          <div>
              <TextGrandM theme='beer'>
                Add to cart:
              </TextGrandM>
              <Counter
                amount={amount}
                onClickDecrease={() => beer && removeCartItem(beer)}
                onClickIncrease={() => beer && addCartItem(beer)}
              /> 
            </div>
        </Description>
      </Inner>
    </Wrap>
  );
}

export default Beer;
