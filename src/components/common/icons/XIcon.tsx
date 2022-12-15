import React from 'react';

interface Props {
  color ? : string;
  width?: string;
  height?: string
}

const XIcon: React.FC < Props > = ({
  color = '#FEAA22',
  width = '24',
  height = '24',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default XIcon;
