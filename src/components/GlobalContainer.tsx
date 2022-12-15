import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectIsSearchActive } from '@/store/selectors/search';

const GlobalContainer: React.FC = ({ children }) => {
  const isSearchOpen = useSelector(selectIsSearchActive);

  return (
    <GlobalContainerStyled isScrollable={!isSearchOpen}>
      <ScrollbarWrap>
        {children}
      </ScrollbarWrap>
    </GlobalContainerStyled>
  );
};

const GlobalContainerStyled = styled.div<{isScrollable: boolean}>`
  height: 100%;
  max-width: 560px;
  background-color: white;
  margin: 0 auto;
`;

const ScrollbarWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;

  @media screen and (max-width: 768px) {
    & {
      height: auto;
    }
  }
`;

export default GlobalContainer;
