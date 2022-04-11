import styled from 'styled-components'
import { useEffect } from 'react';
import { LinkWrap, TextGrandS, TitleBigGrandBeer } from '../Text'
import { SIMILAR_BEERS } from '../../Redux/beer-reducer'
import { BeerType, BeersType } from '../../interfaces/beers'
import { SimilarType } from '../../interfaces/beer';
import { BEER_COLOR } from '../../consts';
import { Link } from 'react-router-dom';

type SimilarBeersProps = {
  beer: BeerType | null,
  similarBeers: BeerType[],
  getSimilarBeers: (abv: SimilarType, ibu: SimilarType, id: string) => void,
  setSimilarBeers: (item: BeersType) => void,
}

const Wrap = styled.div`
  border-top: 3px solid ${BEER_COLOR};
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Inner = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  padding: 20px;
  grid-template-columns: repeat(4, auto); 
  grid-template-rows: repeat(4, auto);
  grid-auto-columns: auto;
  grid-auto-rows: auto;
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 180px;
  width: 180px;
  border-bottom: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 20px;
`

const Image = styled.img`
  height: 150px;
  width: max-content;
  margin: 0 auto 4px;
`

const TextWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 3px 0;
`

const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0 25px;
`

const SimilarBeers = (props: SimilarBeersProps) => {
  const {
    similarBeers,
    getSimilarBeers,
    setSimilarBeers,
    beer,
  } = props

  console.log('similarBeers', similarBeers)
  const getAbv = (abv: number) => ({
    gt: `${(abv - 1 < 0 ? 0 : abv - 1 ).toFixed(2)}`,
    lt: `${(abv + 1 < 0 ? 0 : abv + 1 ).toFixed(2)}`,
  })

  const getIbu = (ibu: number) => ({
    gt: `${(ibu - 10 < 0 ? 0 : ibu - 10 ).toFixed(2)}`,
    lt: `${(ibu + 10 < 0 ? 0 : ibu + 10 ).toFixed(2)}`,
  })


  useEffect(() => {
    if(beer) {
      const data = localStorage.getItem(`${SIMILAR_BEERS}_${beer.id}`)
      if(data) {
        setSimilarBeers(JSON.parse(data))
      } else {
        getSimilarBeers(getAbv(beer.abv), getIbu(beer.ibu), `${beer.id}`)
      }
    } 
  }, [beer])

  return (
    <Wrap>
      <TitleWrap>
        <TitleBigGrandBeer theme="beer">
          Similar Beer
        </TitleBigGrandBeer>
      </TitleWrap>
      <Inner>
        {similarBeers.map(item => (
          <LinkWrap key={item.id}>
            <Link to={`/beer/${item.id}`} reloadDocument={true}>
              <Item>
                <Image src={item?.image_url || ''} alt={`Beer: ${item?.name || ''}`} />
                <TextWrap>
                  <TextGrandS theme="beer">
                    ABV: {item?.abv ? `${item.abv}%` : ''}
                  </TextGrandS>
                </TextWrap> 
                <TextWrap>
                  <TextGrandS theme="beer">
                    IBU: {item?.ibu || ''}
                  </TextGrandS>
                </TextWrap> 
              </Item>
            </Link>
          </LinkWrap>
        ))}
      </Inner>
    </Wrap>

  );
}

export default SimilarBeers;
