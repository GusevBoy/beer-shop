import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BEER_COLOR } from '../../consts'

import {
	TiBeer as BeerIcon,
} from 'react-icons/ti'

const Wrap = styled.div<{ml: number}>`
	position: relative;
	margin-left: ${props => `${props.ml}px`};
`

const Icon = styled.div`
	position: absolute;
	top: 8px;
	left: 10px;
`

const Input = styled.input`
	position: relative;
	width: 300px;
	height: 37px;
	padding: 14px 10px 12px 45px;
	border: 1px solid ${BEER_COLOR};
	box-sizing: border-box;
	background:none;
	outline:none;
	color: #fff;
	font-size: 18px;
	cursor: pointer;
	text-transform: uppercase;
	font-size: 14px;
	font-weight: bold;
	line-height: .8em;
	color: #fff;
	letter-spacing: 3px;
	:active {
		border:none;
    background:none;
    outline:none;
	}
	::placeholder {
		color: ${BEER_COLOR};
	}
`

const Search = ({
  ml = 0,
  value: defaultValue,
	onChange
}: {
  ml: number,
  value: string,
	onChange: (value: string) => void,
}) => {
  console.log('defaultValue', defaultValue)
  const [value, setValue] = useState(defaultValue)
  
  useEffect(() => {
    if(!defaultValue) {
      setValue('')
    }
  }, [defaultValue])
	const [timeout, setTimeout] = useState(1500)
	
	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		window.clearTimeout(timeout)
		const newValue = e.currentTarget.value;
		setValue(newValue)
		setTimeout(window.setTimeout(() => onChange(newValue), 1500));
	}

  return (
    <Wrap ml={ml}>
			<Input
				placeholder="search"
				onChange={(e) => handleOnChange(e)}
				value={value}
			
			/>
			<Icon>
					<BeerIcon color={BEER_COLOR} size={23} />
			</Icon>
		</Wrap>
  );
}

export default Search;
