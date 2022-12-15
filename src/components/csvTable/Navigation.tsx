import React from 'react';
import styled from 'styled-components';
import BackIcon from '@/components/common/icons/BackIcon';

interface Props {
  weeks: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Navigation: React.FC<Props> = ({ weeks, page, setPage }) => {
  const prevPage = () => (weeks[page - 1] ? setPage(page - 1) : null);
  const nextPage = () => (weeks[page + 1] ? setPage(page + 1) : null);
  return (
    <NavigationBlock>
      <NavButtons>
        <NavButton disabled={!weeks[page - 1]} onClick={prevPage}>
          <BackIcon />
        </NavButton>
        <Date>{`${(weeks[page]?.startDay) ? weeks[page]?.startDay.toLocaleDateString() : ''} - ${(weeks[page]?.endDay) ? weeks[page]?.endDay.toLocaleDateString() : ''}`}</Date>
        <NavButton style={{ transform: 'scale(-1,1)' }} disabled={!weeks[page + 1]} onClick={nextPage}>
          <BackIcon />
        </NavButton>
      </NavButtons>
    </NavigationBlock>
  );
};
const NavigationBlock = styled.div`
  z-index: 102;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  width: 250px;
`;

const NavButton = styled.div<{disabled: boolean}>`
  cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.1' : '0.7')};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? '0.1' : '1')};
  }
`;
const NavButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Date = styled.div`
  
`;

export default Navigation;
