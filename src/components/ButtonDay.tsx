import React from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const Button: React.FC<Props> = ({ children, onClick, isActive = false }) => (
  <StyledButton className={isActive ? 'catalog business-details delivery-day choose-dd-toggle-on' : 'catalog business-details delivery-day choose-dd-toggle-off'} isActive={isActive} onClick={onClick}>{children}</StyledButton>
);

const StyledButton = styled.button<{ isActive: boolean}>`
  border-radius: 6px;
  border: ${({ isActive }) => (isActive ? '1px solid #3897ff' : 'solid 1px #dae1e8')};
  background-color: ${({ isActive }) => (isActive ? '#3897ff' : 'rgba(255, 255, 255, 0)')};
  width: 40px;
  height: 36px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#21272e;')};
  cursor: pointer;
  
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  padding: 0;
  outline: none;
`;

export default Button;
