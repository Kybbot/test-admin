import React from 'react';
import styled from 'styled-components';

interface Props {
  index: number;
  item: IPerson;
}

export const NameBlock = styled.td`
    vertical-align: top;
    width: 182px;
    height: 40px;
    min-height: 40px;
    text-align: start;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 700;
`;

export interface IPerson {
  adminId: string;
  name: string;
  id: string;
  contracts: IContract[];
  totalHours: number[];
  totalMoney: number;
  avatar: string| undefined;
}
export interface IContract {
  name: string;
  id: string;
  dates: IDay[];
  totalHours: number[];
  totalMoney: number| string;
}
interface IDay {
  date: number;
  hours: number[];
  money: string;
}
const Person: React.FC<Props> = ({ index, item }) => (
  <>
    {index === 0 && (
    <NameBlock rowSpan={item.contracts.length}>
      <Name avatarSrc={item.avatar}>
        {item.avatar ? <Avatar src={item.avatar} avatarSrc={item.avatar} /> : <AvatarPlaceholder />}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>{item.name}</h2>
          {!item.avatar && (
          <h3>
            id:
            {item.id}
          </h3>
          )}
        </div>
      </Name>
    </NameBlock>
    )}
  </>
);
const AvatarPlaceholder = styled.div`
  border: 1px solid red;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 8px;
`;
const Avatar = styled.img<{ avatarSrc: string | undefined }>`
  border: ${({ avatarSrc }) => (avatarSrc ? '' : '1px solid red')};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 8px;
`;
const Name = styled.div<{ avatarSrc: string | undefined }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: ${({ avatarSrc }) => (avatarSrc ? '' : 'red')};
  }
  h3 {
    color: red;
    font-size: 11px;
  }
`;
export default Person;
