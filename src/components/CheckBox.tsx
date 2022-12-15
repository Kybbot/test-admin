import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  isChecked: boolean;
  onClick?: () => void;
}

const Checkbox: React.FC<Props> = ({
  isChecked,
  onClick,
}) => (
  <CustomCheckbox className="catalog item-list checkbox" isChecked={isChecked} onClick={onClick} />
);

const CustomCheckbox = styled.div<{ isChecked: boolean }>`
  width: 22px;
  height: 22px;
  cursor: pointer;

  background-color: transparent;
  border: 2px solid #dae1e8;
  border-radius: 4px;
  position: relative;

  ${({ isChecked }) => isChecked && css`
    background-color:#3897ff;
    border: 1px solid transparent;
    ::after {
      content: "";
      position: absolute;
      width: 6px;
      height: 12px;
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(40deg);
    }
  `};
`;

export default Checkbox;
