import React from 'react';
import styled from 'styled-components';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';

interface Props {
  tag: string;
  count: number;
  onClick: () => void;
}

const TagItem: React.FC<Props> = ({ tag, count, onClick }) => (
  <ItemWrap onClick={onClick}>
    <TagName isColor>
      {tag}
    </TagName>
    <SmallWrap>
      {Boolean(count) && (<Count>{count}</Count>)}
      <RightArrow>
        <SmallArrowIcon />
      </RightArrow>
    </SmallWrap>
  </ItemWrap>
);

const TagName = styled.div<{isColor: boolean}>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.3px;
  color: ${({ isColor }) => (isColor ? '#21272e' : '#909599')};
  word-break: break-word;
  text-transform: capitalize;

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 16px;
  margin: 8px 0;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  cursor: pointer;
`;

const SmallWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  font-size: 12px;
  align-items: center;
  background: #d1d2d45c;
  justify-content: center;
  border-radius: 100%;
  margin-left: 10px;
  font-weight: 700;
`;

const RightArrow = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 12px;
`;

export default TagItem;
