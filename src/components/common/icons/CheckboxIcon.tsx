import React from 'react';

interface Props {
  color?: string;
}

const CheckboxIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <path fill={color} fillRule="nonzero" d="M26.667 5.333v16h-16v-16h16m0-2.666h-16C9.2 2.667 8 3.867 8 5.333v16C8 22.8 9.2 24 10.667 24h16c1.466 0 2.666-1.2 2.666-2.667v-16c0-1.466-1.2-2.666-2.666-2.666zm-10.04 16L12 14l1.867-1.88 2.76 2.773L23.467 8l1.866 1.88-8.706 8.787zM5.333 8H2.667v18.667c0 1.466 1.2 2.666 2.666 2.666H24v-2.666H5.333V8z" transform="translate(-164 -371) translate(164 371)" />
            <path d="M0 0L32 0 32 32 0 32z" transform="translate(-164 -371) translate(164 371)" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CheckboxIcon;
