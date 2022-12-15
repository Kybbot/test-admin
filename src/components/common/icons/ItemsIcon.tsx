import React from 'react';

interface Props {
  color?: string;
}

const ItemsIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
    <g fill="none" fillRule="evenodd">
      <g stroke={color} strokeWidth="2.667">
        <g transform="translate(-164 -371) translate(164 371)">
          <path d="M2.667 18.667H13.334V29.334000000000003H2.667zM16 2.592L9.555 13.333h12.89L16 2.592z" />
          <circle cx="24.667" cy="24" r="6" />
        </g>
      </g>
    </g>
  </svg>
);

export default ItemsIcon;
