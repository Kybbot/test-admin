import React from 'react';

interface Props {
  color ? : string;
}

const IMEIIcon: React.FC < Props > = ({ color = '#FEAA22' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="24" height="24" fill="#FFF" fillOpacity=".01" rx="12" />
      <rect width="4" height="4" x="2" y="3" fill="#DEF4F2" stroke="#2A2A2F" strokeWidth="2" rx="2" />
      <rect width="14" height="2" x="9" y="4" fill="#2A2A2F" rx="1" />
      <rect width="14" height="2" x="9" y="11" fill="#2A2A2F" rx="1" />
      <rect width="14" height="2" x="9" y="18" fill="#2A2A2F" rx="1" />
      <rect width="4" height="4" x="2" y="10" fill="#DEF4F2" stroke="#2A2A2F" strokeWidth="2" rx="2" />
      <rect width="4" height="4" x="2" y="17" fill="#DEF4F2" stroke="#2A2A2F" strokeWidth="2" rx="2" />
    </g>
  </svg>
);

export default IMEIIcon;
