import React from 'react';
import styled from 'styled-components';

interface IProps {
  img: string;
  width: string;
  height: string;
  disabled?: boolean
}

const Icon: React.FC<IProps> = ({
  img,
  width,
  height,
  disabled = false,
}) => (
  <IconStyled img={img} width={width} height={height} disabled={disabled} />
);

const IconStyled = styled.div<{ img: string, width: string, height: string, disabled: boolean }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: ${({ img }) => `url(/assets/emoji/${img})`};
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`;

export default Icon;
