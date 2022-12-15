import React from 'react';

interface Props {
  color ? : string;
}

const CPUIcon: React.FC < Props > = ({ color = '#FEAA22' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        fill="#20B1A9"
        fillOpacity=".15"
        stroke="#2A2A2F"
        strokeWidth="2"
        d="M19 6.286C19 5.576 18.424 5 17.714 5H6.286C5.576 5 5 5.576 5 6.286v11.428C5 18.424 5.576 19 6.286 19h11.428c.71 0 1.286-.576 1.286-1.286V6.286z"
      />
      <path fill="#2A2A2F" d="M7 19h2v2a1 1 0 0 1-2 0v-2zM11 19h2v2a1 1 0 0 1-2 0v-2zM15 19h2v2a1 1 0 0 1-2 0v-2zM5 7v2H3a1 1 0 1 1 0-2h2zM5 11v2H3a1 1 0 0 1 0-2h2zM5 15v2H3a1 1 0 0 1 0-2h2zM19 7v2h2a1 1 0 0 0 0-2h-2zM19 11v2h2a1 1 0 0 0 0-2h-2zM19 15v2h2a1 1 0 0 0 0-2h-2zM8 2a1 1 0 0 1 1 1v2H7V3a1 1 0 0 1 1-1zM12 2a1 1 0 0 1 1 1v2h-2V3a1 1 0 0 1 1-1zM16 2a1 1 0 0 1 1 1v2h-2V3a1 1 0 0 1 1-1z" />
    </g>
  </svg>
);

export default CPUIcon;
