import React from 'react';
import styled from 'styled-components';

import DropDownIcon from '@/components/common/icons/DropDownIcon';
import useToggle from '@/components/common/hooks/useToggle';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string[];
  setValue: (role: any) => void;
  text?: string;
  values: any[] | null;
}

const DropDownMultiplySelect: React.FC<InputProps> = ({
  value,
  setValue,
  text = '',
  values,
}) => {
  const [isActive, setActive] = useToggle();
  const selectRef = useOnClickOutside(() => setActive(false));

  const changeValue = (name: string) => () => {
    const updatedValue = value.includes(name)
      ? value.filter((i: string) => i !== name) : [...value, name];

    setValue(updatedValue);
  };

  return (
    <>
      <Label>
        <Span>{text}</Span>
        <Option
          isActive={isActive}
          onClick={() => setActive(true)}
        >
          <SelectWrap>
            <ContainerName>{value.join(', ')}</ContainerName>
            <IconDropDown isActive={isActive}>
              <DropDownIcon />
            </IconDropDown>
          </SelectWrap>
          <DropDown ref={selectRef}>
            {values!.map((val) => (
              <DropDownItems
                key={val}
                onClick={changeValue(val)}
                statusHover={value.includes(val)}
              >
                <TextWrap key={`text${val}`}>{val}</TextWrap>
              </DropDownItems>
            ))}
          </DropDown>
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
  top: -2px;
  left: 10px;
  padding: 0 2px 0 6px;
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
  
  &::first-letter {
    text-transform: uppercase;
  }
`;

const TextWrap = styled.div`
  &::first-letter {
    text-transform: uppercase;
  }
`;

const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 17px;
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
  width: 100%;
  height: 44px;
  background-color: ${({ statusHover }) => (statusHover ? '#f5f6f7' : ' #ffffff')};
  padding: 0 17px;
  display: flex;
  align-items: center;
  user-select: none;
  
  &::first-letter {
    color: white;
  }
`;

const DropDown = styled.div`
  padding: 8px 0;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.22);
  background-color: #ffffff;
  overflow: auto;
  max-height: 160px;
  position: absolute;
  width: 100%;
  z-index: 80;
  top: 70px;
  left: 0;
  border: solid 1px #dae1e8;
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

  ${DropDown} {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  };
`;

export default DropDownMultiplySelect;
