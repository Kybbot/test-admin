import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { addCustomerFromProject } from '@/store/actions/customers';
import { selectCustomers } from '@/store/selectors/customers';

import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import useToggle from '@/components/common/hooks/useToggle';
import useInput from '@/components/common/hooks/useInput';
import DropDownIcon from '@/components/common/icons/DropDownIcon';

import search from '@/utils/search';
import getPhoto from '@/utils/getPhoto';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (id: number, name: string) => void;
  text?: string;
}

const DropDownSelect: React.FC<InputProps> = ({
  value,
  setValue,
  text = '',
}) => {
  const [isActive, setActive] = useToggle(false);
  const selectRef = useOnClickOutside(() => setActive(false));
  const [inputValue, setInputValue] = useInput(value);
  const [inputRef, focusInput] = useFocusInput();
  const customers = useSelector(selectCustomers);

  useEffect(() => {
    if (isActive) {
      focusInput();
    }
  }, [isActive]);

  const changeValue = (id: number, name: string) => () => {
    setInputValue(name);
    setValue(id, name);
  };

  useEffect(() => {
    customers?.forEach((customer) => {
      if (customer.name === inputValue) setValue(customer._id, customer.name);
    });
  }, [customers]);

  const searchItem = search(customers!, inputValue, ({ name }) => name);

  const dispatch = useDispatch();

  const handleSaveButtonClick = () => {
    const body = {
      name: inputValue,
    };

    dispatch(addCustomerFromProject(body));
  };

  return (
    <>
      <Wrap>
        <Label>
          <Span>{text}</Span>
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
            <DropDown>
              {searchItem.length > 0 ? searchItem!.map((customer) => (
                <DropDownItems
                  key={customer._id}
                  onClick={changeValue(customer._id, customer.name)}
                  statusHover={customer.name === value}
                >
                  <DropDownPhoto url={getPhoto(customer.smallPhoto)} />
                  {customer.name}
                </DropDownItems>
              )) : (
                <DropDownItems
                  onClick={handleSaveButtonClick}
                  statusHover={inputValue === value}
                >
                  <PlusWrap>
                    <PlusIcon stroke="#21272e" width="18px" height="18px" />
                  </PlusWrap>
                  Add customer
                </DropDownItems>
              )}
            </DropDown>
          </InputWrap>
        </Label>
      </Wrap>
    </>
  );
};

const PlusWrap = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Wrap = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  position: relative;
`;

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
  z-index: 1;
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

const DropDownPhoto = styled.div<{url: string}>`
  width: 30px;
  height: 30px;
  background-image: ${({ url }) => (`url('${url}')`)};
  background-size: cover;
  border-radius: 5px;
  margin-right: 10px;
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

export default DropDownSelect;
