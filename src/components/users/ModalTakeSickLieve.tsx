import React from 'react';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';
import { HandleToggle } from '@/components/common/hooks/useToggle';
import useWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';
import TextArea from '@/components/TextArea';
import useInput from '@/components/common/hooks/useInput';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hideModal: HandleToggle;
  confirm: (comment: string) => void;
}

const ModalSickLeave: React.FC<ModalProps> = ({
  hideModal,
  confirm,
}) => {
  const [comment, setComment] = useInput();
  useWindowScrollBlock();
  const [{ common }] = useLanguage();

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const approveHandle = () => {
    confirm(comment);
    hideModal(false);
  };

  return (
    <>
      <Background height={window.innerHeight} onClick={hideModal}>
        <Modal height={window.innerHeight} onClick={stopPropagation}>
          <Wrap>
            <SmallWrap>
              <DeleteTitle>{common.reason}</DeleteTitle>
            </SmallWrap>
          </Wrap>
          <TextArea
            setDescription={setComment}
            descriptionValue={comment}
          />
          <FilterButton>
            <Button
              disabled={false}
              onClick={hideModal}
            >
              {common.cancel}
            </Button>
            <Button
              disabled={!comment.length}
              onClick={approveHandle}
            >
              {common.confirm}
            </Button>
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

const Button = styled.div<{ disabled: boolean }>`
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 10px;
  height: 36px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 36px;
  color: ${({ disabled }) => (disabled ? '#787c80' : 'rgb(56 151 255)')};
`;

const FilterButton = styled.div`
  height: 52px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-bottom: 10px;
`;

const Modal = styled.div<{ height: number }>`
  width: 320px;
  min-height: 185px;
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
  padding: 24px 16px 0 24px;
  background-color: white;
  position: absolute;
  left: calc((100vw - 320px) / 2);
  top: ${({ height }) => height && `calc((${height}px - 220px) / 2)`};
`;

const Background = styled.div<{ height: number }>`
  width: 100vw;
  height: ${({ height }) => height && `${height}px`};
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

export default ModalSickLeave;
