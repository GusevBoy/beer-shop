import styled from 'styled-components'
import { useEffect } from 'react';
import { BeerType } from '../../interfaces/beers'
import { SimilarType } from '../../interfaces/beer';

type BeerProps = {
  beer: BeerType | null,
  getSimilarBeers: (abv: SimilarType, ibu: SimilarType) => void,
}

const Wrap = styled.div`
	position: relative;
`

const Beer = (props: BeerProps) => {
  const {
    getSimilarBeers,
    beer,
  } = props


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
      getSimilarBeers(getAbv(beer.abv), getIbu(beer.abv))
    } 
  }, [beer])

  return (
    <Wrap>
    </Wrap>
  );
}

export default Beer;
