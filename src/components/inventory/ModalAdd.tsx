import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { selectIsSaveLoading, selectParams } from '@/store/selectors/inventory';
import { createInventoryItem } from '@/store/actions/inventory';

import useToggle, { HandleToggle } from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';
import useWindowScrollBlock from '@/components/common/hooks/useWindowScrollBlock';
import useInput from '@/components/common/hooks/useInput';
import DropDownSelect from '@/components/DropDownSelect';
import Loader from '@/components/common/Loader';
import Input from '@/components/Input';

interface ModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hideModal: HandleToggle;
}

const ModalAdd: React.FC<ModalProps> = ({
  hideModal,
}) => {
  useWindowScrollBlock();
  const [diagonal, setDiagonal] = useState('');
  const [model, setModel] = useState('');
  const [cpu, setCpu] = useState('');
  const [year, setYear] = useState('');
  const [memory, setMemory] = useState('');
  const [ram, setRam] = useState('');
  const [imei, setImei] = useInput('');
  const [isButtonPressed, toggleIsButtonPressed] = useToggle();

  const [{ inputsPages }] = useLanguage();

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsSaveLoading);
  const parameters = useSelector(selectParams);
  const currentYear = moment().get('year');

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const saveHandle = () => {
    if (!diagonal
      || !model
      || !cpu
      || !memory
      || !ram
      || !imei
      || !year) return;

    const body = {
      model,
      diagonal,
      cpu,
      memory,
      ram,
      imei: imei.toUpperCase(),
      year: year.toString(),
    };

    dispatch(createInventoryItem(body));

    toggleIsButtonPressed(true);
  };

  useEffect(() => {
    if (!isLoading && isButtonPressed) hideModal(false);
  }, [isLoading]);

  const hide = () => [!isLoading && hideModal(false)];

  const years = [2015];

  while (years[0] !== currentYear) {
    years.unshift(years[0] + 1);
  }

  const isButtonDisabled = (!diagonal
    || !model
    || !cpu
    || !memory
    || !ram
    || !imei
    || !year);

  return (
    <>
      <Background height={window.innerHeight} onClick={hideModal} />
      <Modal height={window.innerHeight} onClick={stopPropagation}>
        <Wrap>
          <SmallWrap>
            <DeleteTitle>{inputsPages.create}</DeleteTitle>
          </SmallWrap>
          {isLoading && (
            <SmallLoader>
              <Loader position={false} width="100%" height="100%" />
            </SmallLoader>
          )}
        </Wrap>
        <InputWrap>
          <DropDownSelect
            value={model}
            setValue={setModel}
            text={inputsPages.model}
            values={parameters!.model}
          />
        </InputWrap>
        <InputWrap>
          <DropDownSelect
            value={diagonal}
            setValue={setDiagonal}
            text={inputsPages.diagonal}
            values={parameters!.diagonal}
          />
        </InputWrap>
        <InputWrap>
          <DropDownSelect
            value={year}
            setValue={setYear}
            text={inputsPages.year}
            values={years}
          />
        </InputWrap>
        <InputWrap>
          <DropDownSelect
            value={cpu}
            setValue={setCpu}
            text="CPU"
            values={parameters!.processor}
          />
        </InputWrap>
        <InputWrap>
          <DropDownSelect
            value={ram}
            setValue={setRam}
            text="Ram"
            values={parameters!.ram}
          />
        </InputWrap>
        <InputWrap>
          <DropDownSelect
            value={memory}
            setValue={setMemory}
            text={inputsPages.memory}
            values={parameters!.memory}
          />
        </InputWrap>
        <InputWrap>
          <Input
            type="text"
            placeholder="C02Y72LCJG5H"
            label="IMEI"
            onChange={setImei}
            value={imei.toUpperCase()}
            autocapitalize="all"
          />
        </InputWrap>
        <FilterButton>
          <Button
            disable={isLoading}
            onClick={hide}
          >
            {inputsPages.cancel}
          </Button>
          <Button
            disable={isLoading || isButtonDisabled}
            onClick={saveHandle}
          >
            {inputsPages.save}
          </Button>
        </FilterButton>
      </Modal>
    </>
  );
};

const SmallLoader = styled.div`
  width: 50px;
  height: 0px;
  position: relative;
  transform: scale(0.4);
`;

const SmallWrap = styled.div``;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div<{ disable: boolean }>`
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 10px;
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
  color: ${({ disable }) => (disable ? '#787c80' : 'rgb(56 151 255)')};
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
  margin-bottom: 16px;
`;

const Modal = styled.div<{ height: number }>`
  width: 80%;
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
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 151;
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

const InputWrap = styled.div`
  font-weight: 400 !important;
  margin-bottom: 16px;
  width: 100%;
  
  span {
    top: -8px;
  }
`;

export default ModalAdd;
