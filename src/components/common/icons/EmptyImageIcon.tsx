import React from 'react';
import styled from 'styled-components';

const EmptyImageIcon: React.FC = () => (
  <ImageWrap>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g stroke="#B4BABF" strokeWidth="2">
          <g>
            <g transform="translate(-52 -228) translate(52 228) translate(3 3)">
              <rect width="18" height="18" rx="2" />
              <circle cx="5.5" cy="5.5" r="1.5" />
              <path d="M18 12L13 7 2 18" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </ImageWrap>
);

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default EmptyImageIcon;
