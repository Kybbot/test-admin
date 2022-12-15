/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import WarningIcon from '@/components/common/icons/auth/WarningIcon';
import { OnChange } from '@/components/common/hooks/useInput';
import useKeyPress from '@/components/common/hooks/useKeyPress';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import useToggle from '@/components/common/hooks/useToggle';
import useOnClickOutside from '@/components/common/hooks/useOnClickOutside';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import { validateUrl } from '@/utils/validate-url';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMsg?: string;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  onClick?: () => void;
  icon?: string | null;
  color?: string;
  iconComponent?: React.ReactNode;
  isCurrency?: boolean;
  classTracking?: string;
  isBorder?: boolean;
  autocapitalize?: string;
  isDate?: boolean;
  index: number;
  value: string[];
}

const MultiplyInput: React.FC<Props> = ({
  pattern,
  type = 'text',
  label,
  errorMsg = '',
  disabled,
  placeholder,
  setValue,
  onClick,
  value,
  readOnly = false,
  color,
  onFocus,
  onBlur,
  iconComponent,
  isCurrency = false,
  classTracking = '',
  isBorder = true,
  autocapitalize = 'on',
  index,
}) => {
  const refLable = useRef<any>();
  const [isActive, setActive] = useToggle(false);
  const [widthLable, setWidthLable] = useState(0);
  const [inputValue, setInputValue] = useState(value[index]);
  const enterPress = useKeyPress('Enter');
  const [inputRef, focusInput] = useFocusInput();
  const wrapRef = useOnClickOutside(() => setActive(false));

  const dic = '0123456789.,';

  useEffect(() => {
    setInputValue(value[index]);
  }, []);

  useEffect(() => {
    if (isActive) {
      setActive(false);
      inputRef.current.blur();
    }
  }, [enterPress]);

  useEffect(() => {
    if (isActive) {
      focusInput();
    } else {
      const res = [...value];

      res[index] = inputValue;

      setValue(res);
    }
  }, [isActive]);

  const onKeyPress = (
    e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;
    if (!dic.includes(key)) {
      e.preventDefault();
    }
  };

  const onChange: OnChange = (data) => {
    const valueInput = typeof data === 'string' ? data : data.target.value;
    setInputValue(valueInput);
  };

  useEffect(() => {
    if (refLable.current) {
      setWidthLable(refLable.current.offsetWidth);
    }
  }, [refLable.current]);

  const handleDelete = (name: string) => {
    const res = value.filter((i: string) => i !== name);
    setValue(res.length ? res : ['']);
  };

  const isError = !validateUrl(inputValue);

  return (
    <>
      <InputWrapper
        isBorder={isBorder}
        ref={wrapRef}
        onClick={setActive}
      >
        {isError && iconComponent ? (
          <Icon isError={isError}>
            <WarningIcon />
          </Icon>
        ) : (
          iconComponent && <Icon isError={isError}>{iconComponent}</Icon>
        )}
        <StyledInput
          className={classTracking}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          disabled={disabled}
          type={type}
          error={isError}
          placeholder={placeholder}
          value={inputValue}
          onChange={onChange}
          readOnly={readOnly}
          color={color}
          pattern={pattern}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize={autocapitalize}
          isCurrency={isCurrency}
          isStatus={value.toString().length > 0}
          width={+widthLable + 18}
          isBorder={isBorder}
          onKeyPress={isCurrency ? onKeyPress : () => {}}
        />
        {index > 0 && (
          <PlusWrap onClick={() => handleDelete(value[index])}>
            <PlusIcon stroke="#909599" width="20px" height="20px" />
          </PlusWrap>
        )}
        {label && <Label>{label}</Label>}
      </InputWrapper>
      {isError && <Error>{errorMsg}</Error>}
    </>
  );
};
const InputWrapper = styled.div<{ isBorder: boolean }>`
  position: relative;
  min-height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  ${({ isBorder }) => !isBorder && css`
    border: 1px solid #dae1e8;
    border-radius: 8px;
    display: flex;
    align-items: center;
  `};
`;

const StyledInput = styled.input<{
  error: boolean;
  color?: string;
  isCurrency: boolean;
  isStatus: boolean;
  width: number;
  isBorder: boolean;
}>`
  width: 100%;
  height: 56px;
  padding: 18px 16px;
  border: ${({ error, isBorder }) => (isBorder ? (error ? '1px solid #feaa22' : '1px solid #dae1e8') : 'none')};
  border-radius: 8px;
  color: ${({ color }) => color || '#21272e'};
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  padding-left: ${({ isCurrency, isStatus, width }) => (isCurrency && isStatus ? `${width}px` : '16px')};

  :focus {
    outline: none;
    border: ${({ error }) => (error ? '1px solid #feaa22' : '1px solid #3897ff')};
  }

  ::placeholder {
    font-weight: 500;
    color: #909599;
    line-height: normal;
  }
`;

const Icon = styled.div<{ isError: boolean }>`
  position: absolute;
  display: inline-block;
  width: 24px;
  height: 24px;
  right: 15px;
  top: ${({ isError }) => (isError ? '23%' : '50%')};
  transform: ${({ isError }) => (isError ? 'translateY(0%)' : 'translateY(-50%)')};
`;

const Error = styled.div`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 4px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

const Label = styled.div`
  padding: 0 5px;
  background-color: #fff;
  position: absolute;
  top: -6px;
  left: 11px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  color: #21272e;
`;

const PlusWrap = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  transform: rotate(46deg);
  transition: all 0.3s;
  cursor: pointer;
`;

export default MultiplyInput;
