import React from 'react';

interface Props {
  color?: string;
}

const MediumPriorityIcon: React.FC<Props> = () => (
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    enableBackground="new 0 0 48 48"
  >
    <path
      fill="#f09e1a"
      d="M21.2,44.8l-18-18c-1.6-1.6-1.6-4.1,0-5.7l18-18c1.6-1.6,4.1-1.6,5.7,0l18,18c1.6,1.6,1.6,4.1,0,5.7l-18,18 C25.3,46.4,22.7,46.4,21.2,44.8z"
    />
    <g fill="#fff">
      <circle cx="24" cy="24" r="2" />
      <circle cx="32" cy="24" r="2" />
      <circle cx="16" cy="24" r="2" />
    </g>
  </svg>
);

export default MediumPriorityIcon;
