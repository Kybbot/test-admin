import React from 'react';
import styled from 'styled-components';
import LoaderDots from './common/LoaderDots';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  fixed?: boolean;
  saveItems?:() => void;
  load?: boolean;
  classTracking?: string;
  width?: number;
}

const FixedButton: React.FC<Props> = ({
  name,
  fixed = false,
  saveItems,
  load = false,
  classTracking = '',
  width = 552,
}) => {
  const save = () => {
    if (saveItems) {
      if (!load) saveItems();
    }
  };

  return (
    <AddItemsButton
      className={classTracking}
      load={load}
      onClick={save}
      fixed={fixed}
      width={width}
    >
      {load ? <LoaderDots /> : name}
    </AddItemsButton>
  );
};

const AddItemsButton = styled.div<{ fixed:boolean; load: boolean; width: number }>`
  cursor: pointer;
  box-shadow: 0 14px 30px -8px rgba(94,22,22,0.47);
  padding: 15px 0;
  border-radius: 6px;
  background: ${({ load }) => (load ? '#ff7a82' : 'linear-gradient(99deg, #ff474d, #fa4353)')};
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
  position: ${({ fixed }) => (fixed ? 'static' : 'fixed')};
  bottom: 20px;
  z-index: 100;
  max-width: ${({ width }) => `${width}px`};
  margin-top: ${({ fixed }) => (fixed ? '30px' : '-52px')};
  width: ${({ fixed }) => (fixed ? '100%' : 'calc(100% - 48px)')};
  left: ${({ fixed }) => (fixed ? '0' : '50%')};
  transform: ${({ fixed }) => (fixed ? 'none' : 'translateX(-50%)')};
`;

export default FixedButton;
