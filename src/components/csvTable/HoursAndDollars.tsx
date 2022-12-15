import React from 'react';
import styled from 'styled-components';

interface Props {
  time?: number[];
  money?: string | number;
}

const HoursAndDollars: React.FC<Props> = ({ time, money }) => {
  let t; let m;
  if (time) {
    t = `${time[0]}:${time[1] < 10 ? `0${time[1]}` : time[1]}`;
    t = t === '0:00' ? null : t;
  }
  if (money) {
    const tempMoney = Number(money).toFixed(2);
    m = tempMoney.split('.')[1] === '00' ? tempMoney.split('.')[0] : tempMoney;
  }
  return (
    <div>
      {m && +m !== 0 ? (
        <Money>
          {m}
          $
        </Money>
      ) : ''}
      {t && <Hours>{t}</Hours>}
    </div>
  );
};
const Money = styled.div`
    font-family: 'Manrope3', sans-serif;
    font-weight: 600;
    font-size: 12px;
`;
const Hours = styled.div`
    font-family: 'Manrope3', sans-serif;
    font-size: 12px;
    line-height: 16px;
`;

export default HoursAndDollars;
