import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { OnChange } from '@/components/common/hooks/useInput';
import { HandleToggle } from '@/components/common/hooks/useToggle';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: OnChange;
  label: string;
  type?: string;
  isError?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  setIsFocus: HandleToggle;
  pattern?: string;
  isCurrency?: boolean;
  autocapitalize?: string;
}

const InputBorder: React.FC<InputProps> = ({
  onChange,
  label,
  value = '',
  placeholder = '',
  type = 'text',
  isError = false,
  errorMsg = '',
  disabled = false,
  setIsFocus,
  pattern,
  isCurrency = false,
  autocapitalize = 'on',
}) => {
  const refLable = useRef<any>();
  const [widthLable, setWidthLable] = useState(16);

  useEffect(() => {
    if (refLable.current) {
      setWidthLable(refLable.current.offsetWidth);
    }
  }, [refLable.current]);

  const focus = () => {
    if (setIsFocus) {
      setIsFocus(true);
    }
  };

  const blur = () => {
    if (setIsFocus) {
      setIsFocus(false);
    }
  };

  return (
    <Wrap>
      <CodeBorder>{label}</CodeBorder>
      <Input
        isCurrency={isCurrency}
        pattern={pattern}
        isError={isError}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={focus}
        onBlur={blur}
        isStatus={value.toString().length > 0}
        width={+widthLable + 18}
        autoCapitalize={autocapitalize}
      />
      {isError && <Error>{errorMsg}</Error>}
    </Wrap>
  );
};

const Error = styled.div`
  color: #feaa22;
  position: absolute;
  bottom: -15px;
  left: 16px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

const Wrap = styled.div`
  position: relative;
  margin-bottom: 35px;
`;

const CodeBorder = styled.span`
  font-size: 12.5px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  top: -2px;
  left: 10px;
  padding: 0 2px 0 6px;
  position: absolute;
  background-color: white;
`;

const Input = styled.input<{isStatus: boolean; isCurrency: boolean; isError: boolean; width: number }>`
  caret-color: #f43939;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border: ${({ isError }) => (isError ? '1px solid #feaa22' : '1px solid #dae1e8')};
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-top: 7px;
  padding-left: ${({ isCurrency, isStatus, width }) => (isCurrency && isStatus ? `${width}px` : '16px')};

  &:focus{
    border-radius: 8px;
    border: ${({ isError }) => (isError ? '1px solid #feaa22' : '1px solid #3897ff')};
    outline: none;
  };
  &::placeholder{
    color: #b4babf;
  };
`;

export default InputBorder;
