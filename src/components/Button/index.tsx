

import styled from 'styled-components'	
import { BEER_COLOR } from '../../consts'	

type PropsType = {
	active?: boolean;
	margin?: string;
	onClick: () => void;
	children?: React.ReactNode;
}

const ButtonWrap = styled.button<{active: boolean, margin: string}>`
	display: inline-block;
	z-index: 5;
	position: relative;
	background: none;
	border: none;
	color: #fff;
	font-size: 18px;
	cursor: pointer;
	background: rgba(0,0,0,0.09);
	padding: 0;
	margin: ${props => props.margin || ''};
  height: 37px;
	::after, ::before {
		content: "";
		width: ${props => props.active ? '100%' : 0};
		height: 1px;
		position: absolute;
		transition: all 0.2s linear;
		background: ${BEER_COLOR};
	};
	::after {
		left:0;
		top: 0;
		transition-duration: 0.3s;
	};
	::before {
		right: 0;
		bottom: 0;
		transition-duration: 0.3s;
	}
	:hover::after, :hover::before {
		width: 100%;
	}
`


const Span = styled.span<{active: boolean}>`
	display: block;
	position: relative;
	padding: 14px 10px 12px 10px;
	transition: color 0.2s linear;
	text-transform: uppercase;
	font-size: 14px;
	font-weight: bold;
	line-height: .8em;
	color: #fff;
	letter-spacing: 3px;
	::after, ::before {
		content:"";
		width:1px;
		height: ${props => props.active ? '100%' : 0};
		position: absolute;
		transition: all 0.2s linear;
		background: ${BEER_COLOR};
	};
	:hover::after, :hover::before {
		height: 100%;
	}
	:hover {
		color: ${BEER_COLOR};
	}
	::after {
		right:0;
		bottom: 0;
		transition-duration: 0.3s;
	};
	::before {
		left: 0;
		top: 0;
		transition-duration: 0.3s;
	}
`


const Button = ({
	active = false,
	margin = '',
	onClick,
	children
}: PropsType) => {
  return (  
		<ButtonWrap active={active} margin={margin} onClick={() => onClick()}>
			<Span active={active}>
				{children}
			</Span>
		</ButtonWrap>
  );
}

export default Button;
