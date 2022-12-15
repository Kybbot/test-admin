import React from 'react';

interface Props {
  color ? : string;
}

const MemoryIcon: React.FC < Props > = ({ color = '#FEAA22' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="24" height="24" rx="12" />
      <rect
        width="16"
        height="18"
        x="4"
        y="3"
        fill="#20B1A9"
        fillOpacity=".15"
        stroke="#2A2A2F"
        strokeWidth="2"
        rx="3"
      />
      <circle cx="12" cy="11" r="5" fill="#FFF" stroke="#2A2A2F" strokeWidth="2" />
      <circle cx="12" cy="11" r="1" fill="#2A2A2F" />
      <path stroke="#2A2A2F" strokeLinecap="round" strokeWidth="2" d="M13.018 14l-6.022 4" />
    </g>
  </svg>
);

export default MemoryIcon;
