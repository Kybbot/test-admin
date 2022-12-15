import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { Customer } from '@/store/reducers/customers';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';

import getPhoto from '@/utils/getPhoto';

interface Props {
  customer: Customer;
  onClick?: () => void;
}

const Item: React.FC<Props> = ({ customer, onClick }) => {
  const history = useHistory();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    history.push(`/customers/${customer._id}`);
  };

  return (
    <ItemWrap onClick={handleClick}>
      <ItemInfo>
        <LinkUser>
          <Photo url={getPhoto(customer.smallPhoto)} />
          <TextGroup>
            <NameItem isColor>{customer.name}</NameItem>
          </TextGroup>
        </LinkUser>
      </ItemInfo>
      <LinkUser>
        <RightArrow>
          {onClick ? <PlusIcon width="16" height="16" stroke="rgb(180, 186, 191)" /> : <SmallArrowIcon />}
        </RightArrow>
      </LinkUser>
    </ItemWrap>
  );
};

const LinkUser = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div`
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
`;

const ItemInfo = styled.div`
  width: 100%;
`;

const NameItem = styled.div<{isColor: boolean}>`
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
  padding: 8px 10px;
  margin: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
  cursor: pointer;
`;

const Photo = styled.div<{url: string}>`
  width: 43px;
  height: 43px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 100%;
  margin-right: 10px;
  background-position: center;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Item;
