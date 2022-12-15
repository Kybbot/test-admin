import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteVacation } from '@/store/actions/vacations';
import styled from 'styled-components';

interface DeleteProps {
  vacationID: number;
}

const DeleteButton:React.FC<DeleteProps> = ({ vacationID }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('delete');
  useEffect(() => {
    let timeoutToChangeText: any;
    if (text === 'click to confirm') {
      timeoutToChangeText = setTimeout(() => {
        setText('delete');
      }, 3000);
    }
    if (timeoutToChangeText) {
      return () => clearTimeout(timeoutToChangeText);
    }
    return () => {};
  }, [text]);
  const ChangeText = () => {
    if (text === 'click to confirm') {
      dispatch(deleteVacation(vacationID));
    }
    setText('click to confirm');
  };
  return (
    <DeleteButtonWrapper onClick={ChangeText}>
      {text}
    </DeleteButtonWrapper>
  );
};

const DeleteButtonWrapper = styled.div`
  cursor: pointer;
  text-transform: uppercase;
  height: 36px;
  font-size: 14px;
  font-weight: bold;
  text-align: end;
  line-height: 36px;
  color: #ff464c;
`;

export default DeleteButton;
