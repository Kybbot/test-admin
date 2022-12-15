/* eslint-disable radix */
import React, { useRef } from 'react';
import styled from 'styled-components';

interface Props {
  leftInput: number;
  setLeftInput: (value: number) => void;
  rightInput: number;
  setRightInput: (value: number) => void;
}

const MultyRange: React.FC<Props> = ({
  leftInput,
  setLeftInput,
  rightInput,
  setRightInput,
}) => {
  const leftInputRef = useRef<any>();
  const rightInputRef = useRef<any>();

  const onInputChangeLeft = () => {
    const input = leftInputRef.current;

    const value = Math.min(input.value, rightInput - 1);
    setLeftInput(value);
  };

  const onInputChangeRight = () => {
    const input = rightInputRef.current;

    const value = Math.max(input.value, leftInput + 1);

    setRightInput(value);
  };

  return (
    <Wrapper>
      <Input
        className="catalog business-details operating-hours-slider"
        type="range"
        id="left"
        min={0}
        max={24}
        step="1"
        value={leftInput}
        onChange={onInputChangeLeft}
        ref={leftInputRef}
      />
      <Input
        className="catalog business-details operating-hours-slider"
        type="range"
        id="right"
        min={0}
        max={24}
        step="1"
        value={rightInput}
        onChange={onInputChangeRight}
        ref={rightInputRef}
      />

      <Slider>
        <Track />
        <Range left={(leftInput / 24) * 100} right={(rightInput / 24) * 100} />
        <ThumbLeft left={(leftInput / 24) * 100} />
        <ThumbRight right={(rightInput / 24) * 100} />
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  
  z-index: 2;
  height: 8px;
  width: 100%;

  &[type=range] {
    position: absolute;
    pointer-events: none;
    -webkit-appearance: none;
    z-index: 2;
    height: 8px;
    width: 100%;
    opacity: 0;
  }

  &[type=range]::-webkit-slider-thumb {
    pointer-events: all;
    width: 40px;
    height: 30px;
    border: none;
    background-color: #0026ff;
    width: 26px;
    height: 26px;
    
    -webkit-appearance: none;
  }

  &[type=range]:focus {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }
`;

const Slider = styled.div`
  position: relative;
  z-index: 1;
  height: 8px;
`;

const Track = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 4px;
  background-color:#f0f1f2;
`;

const Range = styled.div<{ left: number; right: number }>`
  position: absolute;
  z-index: 2;
  left: ${({ left }) => `${left}%`};
  right: ${({ right }) => `${100 - right}%`};
  
  top: 0;
  bottom: 0;
  border-radius: 4px;
  background-color: #3897ff;
`;

const ThumbLeft = styled.div<{ left: number }>`
  position: absolute;
  z-index: 3;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  background-color: #fff;
  left: ${({ left }) => `${left}%`};
  transform: translate(-13px, -9px);
`;

const ThumbRight = styled.div<{ right: number }>`
  position: absolute;
  z-index: 3;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  background-color: #fff;
  left: ${({ right }) => `${right}%`};
  transform: translate(-13px, -9px);
`;

export default MultyRange;
