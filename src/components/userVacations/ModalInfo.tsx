import React from 'react';
import styled from 'styled-components';

import { HandleToggle } from '../common/hooks/useToggle';
import UseWindowScrollBlock from '../common/hooks/useWindowScrollBlock';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hideModal: HandleToggle;
}

const ModalDelete: React.FC<ModalProps> = ({ hideModal }) => {
  UseWindowScrollBlock();

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const hide = () => {
    hideModal(false);
  };

  return (
    <>
      <Background onClick={hideModal}>
        <Modal onClick={stopPropagation}>
          <Wrap>
            <SmallWrap>
              <DeleteTitle>Unable to add</DeleteTitle>
            </SmallWrap>
          </Wrap>
          <DeleteText>
            You can only add up to 5 images
          </DeleteText>
          <FilterButton>
            <Button onClick={hide}>OK</Button>
          </FilterButton>
        </Modal>
      </Background>
    </>
  );
};

const SmallWrap = styled.div``;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  cursor: pointer;
  width: 75px;
  height: 36px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 36px;
  color: rgb(56 151 255);
`;

const FilterButton = styled.div`
  height: 52px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteText = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  margin: 20px 0 25px;
`;

const DeleteTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const Modal = styled.div`
  width: 280px;
  height: 165px;
  box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22);
  border-style: solid;
  border-width: 0.5px;
  border-image-source: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.4) 5%,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0)
  );
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #ffffff, #ffffff),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.4) 5%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0)
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 0 auto;
  padding: 24px 16px 16px 24px;
  background-color: white;
  position: absolute;
  left: calc((100vw - 280px) / 2);
  top: calc((100vh - 175px) / 2);
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

export default ModalDelete;
