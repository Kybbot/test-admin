import React, { useEffect } from 'react';
import styled from 'styled-components';

import DropDownIcon from '@/components/common/icons/DropDownIcon';
import useToggle from '@/components/common/hooks/useToggle';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useInput from '@/components/common/hooks/useInput';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import useKeyPress from '@/components/common/hooks/useKeyPress';
import search from '@/utils/search';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string[];
  index: number
  setValue: (string: any) => void;
  text?: string;
  values: any[];
}

const DropDownCustomSelect: React.FC<InputProps> = ({
  value,
  setValue,
  text = '',
  values,
  index,
}) => {
  const [isActive, setActive] = useToggle(false);
  const [inputValue, setInputValue] = useInput(value[index]);
  const selectRef = useOnClickOutside(() => setActive(false));
  const [inputRef, focusInput] = useFocusInput();
  const enterPress = useKeyPress('Enter');

  useEffect(() => {
    setInputValue(value[index]);
  }, []);

  const searchItem = search(values, inputValue, (name) => name);

  useEffect(() => {
    if (isActive) {
      setActive(false);
      inputRef.current.blur();
    }
  }, [enterPress]);

  const changeValue = (name: string) => () => {
    if (inputValue === name) {
      setInputValue('');
      return;
    }

    setInputValue(name);
  };

  const handleDelete = (name: string) => {
    const res = value.filter((i: string) => i !== name);
    setValue(res.length ? res : ['']);
  };

  useEffect(() => {
    if (isActive) {
      focusInput();
    } else {
      const res = value.slice();

      res[index] = inputValue;

      setValue(res);
    }
  }, [isActive]);

  return (
    <>
      <Wrap>
        <Span>{text}</Span>
        <Label>
          <InputWrap
            isActive={isActive}
            ref={selectRef}
            onClick={setActive}
          >
            <Option
              value={inputValue}
              ref={inputRef}
              onChange={setInputValue}
              placeholder="Select or type"
            />
            <SelectWrap>
              <IconDropDown isActive={isActive}>
                <DropDownIcon />
              </IconDropDown>
            </SelectWrap>
            {Boolean(searchItem.length) && (
              <DropDown>
                {searchItem!.map((val) => (
                  <DropDownItems
                    key={val}
                    onClick={changeValue(val)}
                    statusHover={value.includes(val)}
                  >
                    <TextWrap key={`text${val}`}>{val}</TextWrap>
                  </DropDownItems>
                ))}
              </DropDown>
            )}
          </InputWrap>
        </Label>
        {index > 0 && (
          <PlusWrap onClick={() => handleDelete(value[index])}>
            <PlusIcon stroke="#909599" width="20px" height="20px" />
          </PlusWrap>
        )}
      </Wrap>
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

const Label = styled.div`
  display: inline;
  width: 100%;
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

const Option = styled.input`
  width: 90%;
  height: 100%;
  padding: 18px 16px;
  border: none;
  border-radius: 8px;
  color: #21272e;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  padding-left: 16px;

  :focus {
    outline: none;
    border: none;
  }

  ::placeholder {
    font-weight: 500;
    color: #909599;
    line-height: normal;
  }
`;

const InputWrap = styled.div<{ isActive: boolean }>`
  position: relative;
  cursor: pointer;
  height: 56px;
  border-radius: 8px;
  background-color: #ffffff;
  padding-right: 14px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  border: ${({ isActive }) => (isActive ? 'solid 1px #3897ff' : 'solid 1px #dae1e8')};
  user-select: none;

  ${DropDown} {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  };
`;

const Wrap = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  position: relative;
`;

const PlusWrap = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  transform: rotate(46deg);
  transition: all 0.3s;
  cursor: pointer;
`;

export default DropDownCustomSelect;
