import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { InventoryItem } from '@/store/reducers/inventory';
import TransferIcon from '@/components/common/icons/TransferIcon';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import ComputerIcon from '@/components/common/icons/ComputerIcon';
import getPhoto from '@/utils/getPhoto';

interface Props {
  item: InventoryItem;
}

const Item: React.FC<Props> = ({ item }) => (
  <ItemWrap>
    {item.items.map((computer) => (
      <KeyBox key={computer._id}>
        <TopWrap>
          <LinkUser to={`/view-item-history/${computer._id}`}>
            {computer.photo ? (
              <Photo url={getPhoto(computer.photo)} />
            ) : (
              <ComputerIcon color="#333" />
            )}
            <TextGroup>
              <NameItem isColor>{`${computer.model} ${computer.diagonal} ${computer.year}`}</NameItem>
              <Parameters>{`${computer.imei}, ${computer.cpu}, ${computer.ram}, ${computer.memory}`}</Parameters>
            </TextGroup>
          </LinkUser>
          <EditIconWrap to={`/change-item-user/${computer._id}`}>
            <TransferIcon />
          </EditIconWrap>
        </TopWrap>
        <Line style={{ margin: '3px 0 0 -10px' }} />
      </KeyBox>
    ))}
    <Wrap>
      <SmallWrap style={{ display: 'flex' }}>
        {item.user ? (
          <OwnerWrap to={`/users/${item.user._id}`}>
            <SmallWrap style={{ display: 'flex' }}>
              <OwnerPhoto url={getPhoto(item.user.smallPhoto)} />
              <OwnerName isColor>
                {item.user.name}
              </OwnerName>
            </SmallWrap>
            <RightArrow>
              <SmallArrowIcon />
            </RightArrow>
          </OwnerWrap>
        ) : (
          <OwnerName isColor>
            Office
          </OwnerName>
        )}
      </SmallWrap>
    </Wrap>
  </ItemWrap>
);

const LinkUser = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
`;

const TopWrap = styled.div`
  min-height: 61px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const OwnerWrap = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-decoration: none;
`;

const SmallWrap = styled.div`
  align-items: center;
  width: 100%;
`;

const Parameters = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #2c2f33;
  margin-top: 3px;
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
  padding: 0 10px;
  margin: 4px 0;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: rgb(240 241 242 / 27%);
`;

const Photo = styled.div<{url: string}>`
  width: 60px;
  height: 55px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 10px;
  background-position: center;
`;

const OwnerPhoto = styled.div<{url: string}>`
  width: 28px;
  height: 28px;
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

const Line = styled.div`
  width: calc(100% + 20px); 
  height: 1px;
  background-color: #ebeced;
`;

const OwnerName = styled.div<{isColor: boolean}>`
  text-transform: capitalize;
  font-size: 13px;
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

const EditIconWrap = styled(Link)`
  display: block;
  width: 30px;
  height: 30px;
  padding: 3px;
  cursor: pointer;
`;

const RightArrow = styled.div`
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 6px 0;
  min-height: 40px;
  justify-content: space-between;
  cursor: pointer;
`;

const KeyBox = styled.div`
  width: 100%;
`;

export default Item;
