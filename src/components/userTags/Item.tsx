import React from 'react';
import styled from 'styled-components';

import CheckBoxOnIcon from '@/components/common/icons/CheckBoxOnIcon';
import CheckBoxOffIcon from '@/components/common/icons/CheckBoxOffIcon';

interface Props {
  tag: string;
  toggleTag: () => void;
  status: boolean;
  count?: number;
}

const Item: React.FC<Props> = ({
  tag,
  toggleTag,
  status,
  count,
}) => (
  <ItemWrap onClick={toggleTag}>
    {
      status ? (
        <CheckBoxWrap>
          <CheckBoxOnIcon />
        </CheckBoxWrap>
      ) : (
        <CheckBoxWrap>
          <CheckBoxOffIcon />
        </CheckBoxWrap>
      )
    }
    <NameItem isColor>{tag}</NameItem>
    {Boolean(count) && (<Count>{count}</Count>)}
  </ItemWrap>
);

const NameItem = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;


  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ItemWrap = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  position: relative;
  align-items: center;
`;

const CheckBoxWrap = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
  cursor: pointer;
`;

const Count = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  font-size: 12px;
  align-items: center;
  background: #d1d2d45c;
  justify-content: center;
  border-radius: 100%;
  margin-left: 10px;
`;

export default Item;
