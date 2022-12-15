import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import DropDownIcon from '@/components/common/icons/DropDownIcon';
import useToggle from '@/components/common/hooks/useToggle';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  monthValue: string | null;
  yearValue: number | null;
  setMonthValue: (month: string) => void;
  setYearValue: (year: number) => void;
  text?: string;
}

const DropDownSelectDate: React.FC<InputProps> = ({
  monthValue,
  yearValue,
  text = '',
  setMonthValue,
  setYearValue,
}) => {
  const [isActive, setActive] = useToggle();
  const changeMonth = (month: string) => () => setMonthValue(month);
  const changeYear = (year: number) => () => setYearValue(year);
  const selectRef = useOnClickOutside(() => setActive(false));

  const currentDate = moment();
  const currentYear = currentDate.get('year');
  const currentMonth = currentDate.get('month');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const years = [2019];

  if (currentMonth >= 10) {
    while (years[years.length - 1] !== currentYear + 1) {
      years.push(years[years.length - 1] + 1);
    }
  } else {
    while (years[years.length - 1] !== currentYear) {
      years.push(years[years.length - 1] + 1);
    }
  }

  const handleClick = (value: boolean) => (e: any) => {
    e.stopPropagation();

    setActive(value);
  };

  const getSting = () => {
    if (!monthValue && !yearValue) return '';

    if (!monthValue) return yearValue;

    if (!yearValue) return monthValue;

    return `${monthValue} / ${yearValue}`;
  };

  return (
    <>
      <Label>
        <Span>{text}</Span>
        <Option
          isActive={isActive}
          onClick={setActive}
          ref={selectRef}
        >
          <SelectWrap>
            <ContainerName>{getSting()}</ContainerName>
            <IconDropDown isActive={isActive}>
              <DropDownIcon />
            </IconDropDown>
          </SelectWrap>
          <DropDownWrapper>
            <DropDownMonth onClick={handleClick(true)}>
              {months!.map((month) => (
                <DropDownItems
                  key={month}
                  onClick={changeMonth(month)}
                  statusHover={month === monthValue}
                >
                  {month}
                </DropDownItems>
              ))}
            </DropDownMonth>
            <DropDownYear onClick={handleClick(true)}>
              {years!.reverse().map((year) => (
                <DropDownItems
                  key={year}
                  onClick={changeYear(year)}
                  statusHover={year === yearValue}
                >
                  {year}
                </DropDownItems>
              ))}
            </DropDownYear>
          </DropDownWrapper>
        </Option>
      </Label>
    </>
  );
};

const Span = styled.span`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  position: absolute;
  top: -10px;
  left: 10px;
  padding: 0 6px;
  background-color: white;
  z-index: 10;
  white-space: nowrap;
`;

const Label = styled.label`
  height: 85px;
  width: 100%;
  position: relative;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const IconDropDown = styled.div<{isActive: boolean}>`
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: 0.5s ease;
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0)')} ;
`;

const ContainerName = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;
`;

const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 17px;
  width: 100%;
`;

const DropDownWrapper = styled.div`
  display: flex;
  position: absolute;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.22);
  border: solid 1px #dae1e8;
  border-radius: 8px;
  top: 70px;
  left: 0;
  z-index: 80;
  width: 100%;
`;

const DropDownItems = styled.div<{statusHover: boolean}>`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 44px;
  letter-spacing: normal;
  color: #21272e;
  justify-content: center;
  height: 44px;
  background-color: ${({ statusHover }) => (statusHover ? '#f5f6f7' : '#ffffff')};
  display: flex;
  align-items: center;
  text-transform: capitalize;
  width: 21%;
  height: 30px;
  border-radius: 5px;
  flex-shrink: 0;
  user-select: none;
  
  @media (max-width: 552px) {
    width: calc(28%);
  }
`;

const DropDownMonth = styled.div`
  padding: 10px;
  background-color: #ffffff;
  overflow: auto;
  width: 50%;
  border-right: 0;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  border-radius: 8px 0 0 8px;
`;

const DropDownYear = styled.div`
  padding: 10px;
  background-color: #ffffff;
  overflow: auto;
  width: 50%;
  border-right: 0;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  border-radius: 0 8px 8px 0;
`;

const Option = styled.div<{ isActive: boolean }>`
  position: relative;
  cursor: pointer;
  height: 56px;
  border-radius: 8px;
  background-color: #ffffff;
  padding-right: 14px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
  display: flex;
  border: ${({ isActive }) => (isActive ? 'solid 1px #3897ff' : 'solid 1px #dae1e8')};

  ${DropDownMonth} {
    display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  };
  
  ${DropDownYear} {
    display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  };
  
  ${DropDownWrapper} {
    display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  };
`;

export default DropDownSelectDate;
