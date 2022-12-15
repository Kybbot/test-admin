import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  position?: boolean;
  width?: string;
  height?: string;
  scale?: string;
}

const Loader: React.FC<Props> = ({
  position = true, width = '80px', height = '80px', scale = '1',
}) => (

  <Wrapper position={position}>
    <LoaderStyled width={width} heigth={height} scale={scale}>
      <Div />
      <Div />
      <Div />
      <Div />
      <Div />
      <Div />
    </LoaderStyled>
  </Wrapper>
);

const Wrapper = styled.div<{position: boolean}>`
  position: fixed;
  top: 0;
  left: calc(50% - 20px);
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const chase = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const chaseDot = keyframes`
  80%,    
  100% {      
    transform: rotate(360deg);    
  }
`;

const chaseDotBefore = keyframes`
  50% {      
    transform: scale(0.4);    
  }    
  100%,    
  0% {      
    transform: scale(1);    
  }
`;

const LoaderStyled = styled.div<{width: string; heigth: string; scale: string}>`
  width: 40px;
  height: 40px;    
  position: relative;    
  animation: ${chase} 2.5s infinite linear both;
`;

const Div = styled.div`
  width: 100%;    
  height: 100%;    
  position: absolute;    
  left: 0;    top: 0; 
  animation: ${chaseDot} 2s infinite ease-in-out both;

  &::before {
    content: ' ';
    display: block;    
    width: 25%;    
    height: 25%;    
    background-color: #fb7e14;    
    border-radius: 100%;    
    animation: ${chaseDotBefore} 2s infinite ease-in-out both;
  }

  &:nth-child(1) {
    animation-delay: -1.1s;

    &::before {
      animation-delay: -1.1s;
    }
  }

  &:nth-child(2) {
    animation-delay: -1s;

    &::before {
      animation-delay: -1s;
    }
  }

  &:nth-child(3) {
    animation-delay: -0.9s;

    &::before {
      animation-delay: -0.9s;
    }
  }

  &:nth-child(4) {
    animation-delay: -0.8s;

    &::before {
      animation-delay: -0.8s;
    }
  }

  &:nth-child(5) {
    animation-delay: -0.7s;

    &::before {
      animation-delay: -0.7s;
    }
  }

  &:nth-child(6) {
    animation-delay: -0.6s;

    &::before {
      animation-delay: -0.6s;
    }
  }
`;

export default Loader;
