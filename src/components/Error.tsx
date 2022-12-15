import React from 'react';
import styled from 'styled-components';
import useLanguage from './common/hooks/useLanguage';
import DisconnectedIcon from './common/icons/DisconnectedIcon';

const Error = () => {
  const [{ authorization }] = useLanguage();
  return (
    <ErrorWrapper>
      <DisconnectedIcon />
      {authorization.something_went_wrongh}
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.header`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 16px;
    align-items: center;
    justify-content: center;
`;

export default Error;
