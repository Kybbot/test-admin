import React from 'react';

interface Props {
  color?: string;
  width?: string;
  height?: string;
  stroke?: string;
}

const PlusIcon: React.FC<Props> = ({
  color = 'none', stroke = 'currentColor', width = '24', height = '24',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={color} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default PlusIcon;
