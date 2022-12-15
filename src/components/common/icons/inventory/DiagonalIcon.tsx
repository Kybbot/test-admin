import React from 'react';

interface Props {
  color ? : string;
}

const DiagonalIcon: React.FC < Props > = ({ color = '#FEAA22' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      fillRule="evenodd"
    >
      <rect
        width="24"
        height="24"
        fill="#FFF"
        fillOpacity=".01"
        rx="12"
      />
      <g stroke="#2A2A2F" strokeWidth="2" transform="translate(2 4)">
        <rect width="18" height="14" x="1" y="1" fill="#20B1A9" fillOpacity=".15" rx="3" />
        <path strokeLinecap="round" d="M6 11.247L13.809 5" />
      </g>
    </g>
  </svg>
);

export default DiagonalIcon;
