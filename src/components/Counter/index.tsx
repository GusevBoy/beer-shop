import styled from 'styled-components'
import { TextM } from '../Text'
import { BEER_COLOR } from '../../consts'

import {
	MdKeyboardArrowUp as ArrowUpIcon,
	MdKeyboardArrowDown as ArrowDownIcon,
} from 'react-icons/md';

type CounterProps = {
	amount: number,
	margin?: string,
	onClickIncrease: () => void,
	onClickDecrease: () => void,
}


const Wrap = styled.div<{margin?: string}>`
  position: relative;
  box-size: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
  height: 40px;
  width: 130px;
	border-radius: 30px;
  border: 1px solid ${BEER_COLOR};
  margin: ${props => props?.margin || 0};
`

const LeftCounter = styled.div<{ cursorDefault?: boolean }>`
  position: absolute;
  background: transparent;
  width: 77px;
  height: 40px;
  top: 0;
  left: 0;
  cursor: ${props => props.cursorDefault ? 'default' : 'pointer'};
`
const RightCounter = styled(LeftCounter)`
  left: auto;
  right: 0;
`

const ArrowBlock = styled.div`
  width: 22px;
  height: 22px;
`

const Counter = ({
		onClickIncrease,
		onClickDecrease,
    amount,
    margin,
	}: CounterProps) => {
  return (
    <Wrap margin={margin}>
      <LeftCounter cursorDefault={amount <= 1} onClick={() => amount > 1 && onClickDecrease()} />
      <RightCounter onClick={() => onClickIncrease()} />
      <ArrowBlock>
        {amount > 1 && ( 
            <ArrowDownIcon color={BEER_COLOR} size={22} />
        )}
      </ArrowBlock>
      <TextM theme="beer" mr={22} ml={22}>
        {amount}
      </TextM>
      <ArrowBlock>
        <ArrowUpIcon color={BEER_COLOR} size={22} />
      </ArrowBlock>
    </Wrap>
  );
}

export default Counter;
