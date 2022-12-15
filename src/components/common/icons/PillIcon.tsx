import React from 'react';

interface Props {
  color ? : string;
}

const PillIcon: React.FC < Props > = ({ color = '#333' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width="27px"
    height="27px"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        d="M10.53 15.47a.75.75 0 0 1 0 1.06l-2 2a2.164 2.164 0 0 1-3.053.007a.75.75 0 1 1 1.054-1.067c.259.26.68.26.939 0l2-2a.75.75 0 0 1 1.06 0zm2.773-11.945a5.071 5.071 0 0 1 7.172 7.172l-9.778 9.778a5.071 5.071 0 0 1-7.172-7.172l9.778-9.778zm6.111 1.061a3.571 3.571 0 0 0-5.05 0l-4.359 4.359l5.05 5.05l4.36-4.359a3.571 3.571 0 0 0 0-5.05zm-5.419 10.47l-5.05-5.05l-4.359 4.358a3.571 3.571 0 1 0 5.05 5.05l4.359-4.358z"
        fill={color}
      />
    </g>
  </svg>
);

export default PillIcon;
