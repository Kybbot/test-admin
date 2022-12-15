import React from 'react';
import styled from 'styled-components';

import { OnChange } from '@/components/common/hooks/useInput';
import { HandleToggle } from './common/hooks/useToggle';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  descriptionValue?: string | null;
  setDescription: OnChange;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  isError?: boolean;
  setIsFocus?: HandleToggle;
  height?: string;
  classTracking?: string;
}

const TextArea: React.FC<Props> = ({
  descriptionValue,
  setDescription,
  placeholder = '',
  name = '',
  disabled = false,
  isError = false,
  setIsFocus = null,
  height = '105px',
  classTracking = '',
}) => {
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
      <DescriptionBorder>{name}</DescriptionBorder>
      <Textarea
        disabled={disabled}
        placeholder={placeholder}
        value={descriptionValue || ''}
        onChange={setDescription}
        isError={isError}
        onFocus={focus}
        onBlur={blur}
        height={height}
        className={classTracking}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
`;

const DescriptionBorder = styled.span`
  font-size: 12.5px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  top: -9px;
  left: 10px;
  padding: 0 2px 0 6px;
  position: absolute;
  background-color: white;
`;

const Textarea = styled.textarea<{ isError:boolean; height: string }>`
  caret-color: #f43939;
  width: 100%;
  height: ${({ height }) => height};
  border-radius: 8px;
  border: ${({ isError }) => (isError ? 'solid 1px #feaa22' : 'solid 1px #dae1e8')};
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  resize: none;
  padding: 18px 16px;
  &::placeholder{
    color: #b4babf;
  };
  &:focus{
    border-radius: 8px;
    border: ${({ isError }) => (isError ? 'solid 1px #feaa22' : 'solid 1px #3897ff')};
    outline: none;
  };
`;

export default TextArea;
