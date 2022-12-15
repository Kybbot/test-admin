import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorMessage } from '@/store/selectors/errors';
import { cleanErrors } from '@/store/actions/errors';
import AlertIcon from '@/components/common/icons/AlertIcon';

const GlobalToast: React.FC = () => {
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer: any;

    if (errorMessage) {
      timer = setTimeout(() => {
        dispatch(cleanErrors());
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <CSSTransition
      in={Boolean(errorMessage)}
      timeout={3000}
      unmountOnExit
    >
      <CustomToast>
        <Text>
          <IconWrap>
            <AlertIcon color="#fff" />
          </IconWrap>
          {errorMessage}
        </Text>
      </CustomToast>
    </CSSTransition>
  );
};

const CustomToast = styled.div`
  padding: 16px 16px;
  border-radius: 6px;
  box-shadow: 0 8px 19px -6px rgba(0, 41, 41, 0.6);
  background-color: #ff464c;
  display: flex;
  align-items: center;
  z-index: 999999;
  max-width: 520px;
  width: calc(100% - 32px);
  position: fixed;
  left: 50%;
  bottom: 86px;
  transform: translateX(-50%);

  &.enter {
    opacity: 0;
  }
  &.enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.exit {
    opacity: 1;
  }
  &.exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const IconWrap = styled.div`
  float: left;
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 25px;
  letter-spacing: normal;
  color: #ffffff;
  text-overflow: ellipsis;
  overflow: hidden;
  
  &:first-letter {
    text-transform: uppercase;
  }
`;

export default GlobalToast;
