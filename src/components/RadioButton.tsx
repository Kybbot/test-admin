import React from 'react';
import styled from 'styled-components';

interface Props {
  isActive: boolean;
}

const RadioButton: React.FC<Props> = ({ isActive }) => (
  <RadioButtonBorder isActive={isActive}>
    {isActive && <Radio />}
  </RadioButtonBorder>
);

const RadioButtonBorder = styled.div<{ isActive: boolean }>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid;
    border-color: ${({ isActive }) => (isActive ? '#3897ff' : 'gray')};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Radio = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #3897ff;
`;

export default RadioButton;
