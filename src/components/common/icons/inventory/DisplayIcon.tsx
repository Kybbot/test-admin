import React from 'react';

interface Props {
  color ? : string;
}

const DisplayIcon: React.FC < Props > = ({ color = '#FEAA22' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <rect
        width="24"
        height="24"
        fill="#FFF"
        fillOpacity=".01"
        rx="12"
      />
      <path
        fill="#20B1A9"
        fillOpacity=".15"
        stroke="#2A2A2F"
        strokeWidth="2"
        d="M20 5.571C20 4.704 19.296 4 18.429 4H5.57C4.704 4 4 4.704 4 5.571V18.43C4 19.296 4.704 20 5.571 20H18.43c.867 0 1.571-.704 1.571-1.571V5.57z"
      />
      <circle cx="12" cy="8" r="1" fill="#2A2A2F" />
      <circle cx="16" cy="8" r="1" fill="#2A2A2F" />
      <circle cx="8" cy="8" r="1" fill="#2A2A2F" />
      <circle cx="12" cy="12" r="1" fill="#2A2A2F" />
      <circle cx="16" cy="12" r="1" fill="#2A2A2F" />
      <circle cx="8" cy="12" r="1" fill="#2A2A2F" />
      <circle cx="12" cy="16" r="1" fill="#2A2A2F" />
      <circle cx="16" cy="16" r="1" fill="#2A2A2F" />
      <circle cx="8" cy="16" r="1" fill="#2A2A2F" />
    </g>
  </svg>
);

export default DisplayIcon;
