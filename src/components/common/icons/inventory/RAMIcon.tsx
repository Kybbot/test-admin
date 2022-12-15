import React from 'react';

interface Props {
  color ? : string;
}

const RAMIcon: React.FC < Props > = ({ color = '#FEAA22' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <rect
        width="12"
        height="20"
        x="6"
        y="2"
        fill="#20B1A9"
        fillOpacity=".15"
        stroke="#2A2A2F"
        strokeWidth="2"
        rx="2"
        transform="rotate(90 12 12)"
      />
      <path fill="#2A2A2F" d="M5 19h2v1a1 1 0 0 1-2 0v-1zM9 19h2v1a1 1 0 0 1-2 0v-1zM13 19h2v1a1 1 0 0 1-2 0v-1zM17 19h2v1a1 1 0 0 1-2 0v-1zM6 3a1 1 0 0 1 1 1v1H5V4a1 1 0 0 1 1-1zM10 3a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 1-1zM14 3a1 1 0 0 1 1 1v1h-2V4a1 1 0 0 1 1-1zM18 3a1 1 0 0 1 1 1v1h-2V4a1 1 0 0 1 1-1z" />
    </g>
  </svg>
);

export default RAMIcon;
