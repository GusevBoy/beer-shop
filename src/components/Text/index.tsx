import styled from 'styled-components'
import { BEER_COLOR, NIGHT_COLOR, WHITE_COLOR } from '../../consts'

const defaultTheme = 'night'
const colors = {
	beer: BEER_COLOR,
	night: NIGHT_COLOR,
	white: WHITE_COLOR,
}


type ThemeType = 'beer' | 'night' | 'white'

type PropsText = {
	theme?: ThemeType,
	bold?: boolean,
	ls?: boolean,
	uppercase?: boolean,
	mt?: number,
	mr?: number,
	mb?: number,
	ml?: number,
}

const getColor = (theme: ThemeType) => {
	switch (theme) {
		case 'beer': return colors.beer
		case 'night': return colors.night
		case 'white': return colors.white
		default: return colors[defaultTheme]
	}	
}

export const TextS = styled.span<PropsText>`
	font-size: 14px;
	font-family: 'Catamaran', sans-serif;
	font-family: ${props => `${props.bold ? 'Catamaran800' : 'Catamaran'}, sans-serif`};
	color: ${(props) => getColor(props.theme)};
	font-weight: ${props => props.bold ? 800 : 600};
	letter-spacing: ${props => props.ls ? '4px' : 'normal'};
	text-transform: ${props => props.uppercase ? 'uppercase' : 'none'};
	margin-top: ${props => `${props.mt}px` || 0};
	margin-right: ${props => `${props.mr}px` || 0};	
	margin-bottom: ${props => `${props.mb}px` || 0};	
	margin-left: ${props => `${props.ml}px` || 0};
`

export const TextSM = styled(TextS)`
	font-size: 16px;
`


export const TextM = styled(TextS)`
	font-size: 18px;
`

export const TextL = styled(TextS)`
	font-size: 20px;
`

export const TextXLL = styled(TextS)`
	font-size: 28px;
`

export const TextGrandS = styled(TextS)`
  font-family: 'GrandHotel', sans-serif;
`

export const TextGrandM = styled(TextGrandS)`
	font-size: 18px;
`

export const TextGrandL = styled(TextGrandS)`
	font-size: 20px;
`

export const TextGrandXLL = styled(TextGrandS)`
	font-size: 28px;
`

export const TextWhiteSM = styled(TextS)`
	font-size: 16px;
	color: ${colors.white};
`

export const TitleWhiteXS = styled(TextS)`
	font-size: 20px;
	color: ${colors.white};
	letter-spacing: 4px;
`

export const TitleBeer = styled.span`
	font-size: 28px;
	letter-spacing: 4px;
	font-weight: 600;
	font-family: 'Catamaran', sans-serif;
	text-transform: uppercase;
	margin: 0;
	color: ${colors.beer};
`

export const TitleBeerCard = styled.span`
	  font-family: 'Catamaran800', sans-serif;
    font-size: 32px;
    font-weight: 800;
    line-height: 1em;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${colors.night};
`

export const TitleGrandBeer = styled(TitleBeer)`
  font-family: 'GrandHotel', sans-serif;
  font-weight: normal;
  letter-spacing: normal;
  text-transform: none;
`

export const TitleWelcome = styled.span`
	font-size: 44px;
	letter-spacing: .3em;
	font-weight: 800;
	font-family: 'Catamaran800', sans-serif;
	text-transform: uppercase;
	margin: 0;
	color: ${colors.white};
`

export const SubTitleWelcome = styled.span`
	font-size: 34px;
	font-weight: normal;
	font-family: 'GrandHotel', sans-serif;
	margin: 0;
	color: ${colors.beer};
`

export const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    :active {
      color: ${colors.beer}
    }
  }
`