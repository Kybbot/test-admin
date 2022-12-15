import React from 'react';
import styled from 'styled-components';

interface Props {
  res: {
    operator: string,
    time: number[],
  },
  contracts?: number
}

const UnworkedHours:React.FC<Props> = ({ res, contracts }) => {
  let t;
  const { time } = res;
  if (time) {
    t = `${time[0]}:${time[1] < 10 ? `0${time[1]}` : time[1]}`;
    t = t === '0:00' ? '0:00' : t;
  }
  return (
    <UnworkedContainer rowSpan={contracts && contracts}>
      {`${res.operator}${t}`}
    </UnworkedContainer>
  );
};

const UnworkedContainer = styled.td`
  font-size: 12px;
  color: grey;
  border: 1px solid #e7e7e7 !important;
`;

export default UnworkedHours;
