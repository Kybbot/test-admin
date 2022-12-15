/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { OnChange } from '@/components/common/hooks/useInput';
import WarningIcon from '@/components/common/icons/auth/WarningIcon';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputRef?: any;
  errorMsg?: string;
  isError?: boolean;
  onChange: OnChange;
  onKeyDown?: (e: any) => void;
  onClick?: () => void;
  icon?: string | null;
  color?: string;
  iconComponent?: React.ReactNode;
  isCurrency?: boolean;
  classTracking?: string;
  isBorder?: boolean;
  autocapitalize?: string;
  isDate?: boolean;
  accept?: string;
  background?: string;
  widthFile?: string;
  height?: string;
  cursor?: string;
  suppportingIcon?: boolean;
}

const Input: React.FC<Props> = ({
  pattern,
  type = 'text',
  inputRef,
  label,
  errorMsg = '',
  isError = false,
  disabled,
  placeholder,
  onChange,
  onClick,
  value = '',
  readOnly = false,
  color,
  onFocus,
  onBlur,
  iconComponent,
  isCurrency = false,
  classTracking = '',
  isBorder = true,
  autocapitalize = 'on',
  isDate = false,
  onKeyDown,
  // accept = '',

}) => {
  const refLable = useRef<any>();
  const [widthLable, setWidthLable] = useState(0);
  const [pevLength, setPrevLength] = useState(0);

  const dic = '0123456789.,';

  const onKeyPress = (
    e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;
    if (!dic.includes(key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (refLable.current) {
      setWidthLable(refLable.current.offsetWidth);
    }
  }, [refLable.current]);

  if (isDate) {
    useEffect(() => {
      const { length } = value.toString();

      if (length === 2 && pevLength < length) {
        onChange(`${value}.`);
      }

      if (length === 5 && pevLength < length) {
        onChange(`${value}.`);
      }

      setPrevLength(length);
    }, [value]);
  }

  return (
    <InputWrapper
      isBorder={isBorder}
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
        value={value}
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
        onKeyPress={isCurrency ? onKeyPress : () => { }}
        accept="image/*"
        onKeyDown={onKeyDown}
      />
      {label && <Label>{label}</Label>}
      {isError && <Error>{errorMsg}</Error>}
    </InputWrapper>
  );
};
const InputWrapper = styled.div<{ isBorder: boolean;}>`
  position: relative;
  max-height: 56px;
  width: 100%;

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
  cursor: text;
  width: 100%;
  height: ${({ height }) => (height ? `${height}` : '56px')};
  padding: 18px 16px;
  border: ${({ error, isBorder }) => (isBorder ? (error ? '1px solid #feaa22' : '1px solid #dae1e8') : 'none')};
  border-radius: 8px;
  background-color: white;
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
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

const Label = styled.div`
  padding: 0 5px;
  background-color: #fff;
  position: absolute;
  top: -10px;
  left: 11px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  color: #21272e;
`;

export default Input;
